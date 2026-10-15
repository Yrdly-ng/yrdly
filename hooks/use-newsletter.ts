import { useState } from 'react';
import { z } from 'zod';

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  message: string | null;
}

export function useNewsletter() {
  const [state, setState] = useState<NewsletterState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    message: null,
  });

  const subscribe = async (email: string, source: string = 'newsletter-signup') => {
    // Reset state
    setState({
      isLoading: true,
      isSuccess: false,
      error: null,
      message: null,
    });

    try {
      // Validate email
      const validatedData = newsletterSchema.parse({ email });
      
      // Make API request
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        signal: AbortSignal.timeout(20000),
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: validatedData.email,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      setState({
        isLoading: false,
        isSuccess: true,
        error: null,
        message: data.message || 'Successfully subscribed!',
      });

    } catch (error) {
      let errorMessage = 'Failed to subscribe. Please try again.';
      
      if (error instanceof z.ZodError) {
        errorMessage = error.errors[0]?.message || 'Invalid email address';
      } else if (error instanceof Error && error.name !== 'TimeoutError') {
        errorMessage = error.message;
      }

      setState({
        isLoading: false,
        isSuccess: false,
        error: errorMessage,
        message: null,
      });
    }
  };

  const reset = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      error: null,
      message: null,
    });
  };

  return {
    ...state,
    subscribe,
    reset,
  };
}
