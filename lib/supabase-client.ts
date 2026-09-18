import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_APP_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Initialize client only if variables are present
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null

function ensureSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_APP_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.')
  }
}

// Ticket operations
export async function createTicket(data: {
  ticketId: string
  email: string
  eventId: string
  eventName: string
  qrCode: string
  scanned: boolean
}) {
  ensureSupabase()
  // Map to snake_case columns
  const dbData = {
    ticket_id: data.ticketId,
    email: data.email,
    event_id: data.eventId,
    event_name: data.eventName,
    qr_code: data.qrCode,
    scanned: data.scanned
  }

  const { data: ticket, error } = await supabase!
    .from('tickets')
    .insert([dbData])
    .select()
    .single()

  if (error) {
    console.error('[v0] Error creating ticket in Supabase:', error)
    throw error
  }

  return ticket
}

export async function getTicketByIdAndEmail(ticketId: string, email: string) {
  ensureSupabase()
  const { data: ticket, error } = await supabase!
    .from('tickets')
    .select('*')
    .eq('ticket_id', ticketId)
    .eq('email', email)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('[v0] Error fetching ticket:', error)
    throw error
  }

  return ticket || null
}

export async function getTicketById(ticketId: string) {
  ensureSupabase()
  const { data: ticket, error } = await supabase!
    .from('tickets')
    .select('*')
    .eq('ticket_id', ticketId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('[v0] Error fetching ticket by ID:', error)
    throw error
  }

  return ticket || null
}

export async function markTicketScanned(ticketId: string) {
  ensureSupabase()
  const { data: ticket, error } = await supabase!
    .from('tickets')
    .update({ scanned: true, scanned_at: new Date().toISOString() })
    .eq('ticket_id', ticketId)
    .select()
    .single()

  if (error) {
    console.error('[v0] Error marking ticket as scanned:', error)
    throw error
  }

  return ticket
}

export async function checkEmailAlreadyRegistered(email: string, eventId: string) {
  ensureSupabase()
  const { data: ticket, error } = await supabase!
    .from('tickets')
    .select('*')
    .eq('email', email)
    .eq('event_id', eventId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('[v0] Error checking duplicate registration:', error)
    throw error
  }

  return ticket !== null
}

export async function getTicketCountByEvent(eventId: string) {
  ensureSupabase()
  const { count, error } = await supabase!
    .from('tickets')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)

  if (error) {
    console.error('[v0] Error getting ticket count:', error)
    throw error
  }

  return count || 0
}

// Rate limiting
export async function checkRateLimit(ip: string, eventId: string) {
  if (!supabase) {
    console.warn('[Supabase] Client not configured. Skipping rate limit check.')
    return 0
  }
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { count, error } = await supabase
      .from('marketing_rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('event_id', eventId)
      .gt('created_at', oneHourAgo)

    if (error) {
      console.error('[v0] Error checking rate limit:', error)
      return 0
    }

    return count || 0
  } catch (err) {
    console.error('[v0] Exception checking rate limit:', err)
    return 0
  }
}

export async function recordRateLimit(ip: string, eventId: string) {
  if (!supabase) {
    console.warn('[Supabase] Client not configured. Skipping rate limit record.')
    return
  }
  try {
    const { error } = await supabase
      .from('marketing_rate_limits')
      .insert([{ ip_address: ip, event_id: eventId }])

    if (error) {
      console.error('[v0] Error recording rate limit:', error)
    }
  } catch (err) {
    console.error('[v0] Exception recording rate limit:', err)
  }
}

// Admin session
export async function createAdminSession(password: string, ipAddress: string) {
  ensureSupabase()
  const sessionToken = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64')
  
  const { data: session, error } = await supabase!
    .from('admin_sessions')
    .insert([{
      session_token: sessionToken,
      ip_address: ipAddress,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }])
    .select()
    .single()

  if (error) {
    console.error('[v0] Error creating admin session:', error)
    throw error
  }

  return session
}

export async function validateAdminSession(sessionToken: string, ipAddress: string) {
  ensureSupabase()
  const { data: session, error } = await supabase!
    .from('admin_sessions')
    .select('*')
    .eq('session_token', sessionToken)
    .eq('ip_address', ipAddress)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('[v0] Error validating session:', error)
    throw error
  }

  return session || null
}
