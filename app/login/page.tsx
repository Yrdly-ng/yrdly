import Header from "@/components/header";
import Footer from "@/components/footer";
import { HeroLoginForm } from "@/components/auth/HeroLoginForm";
export const metadata = {
  title: "Log in — YRDLY",
  robots: { index: false, follow: true },
};
export default function AuthPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="wrap auth-page">
        <div className="auth-story">
          <p className="eyebrow">A LITTLE CLOSER TO HOME</p>
          <h1>
            Welcome back to
            <br />
            <em>your corner.</em>
          </h1>
          <p>Your conversations, saved finds and familiar faces are waiting.</p>
        </div>
        <HeroLoginForm initialMode="login" />
      </main>
      <Footer />
    </>
  );
}
