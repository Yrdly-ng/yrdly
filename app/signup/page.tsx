import Header from "@/components/header";
import Footer from "@/components/footer";
import { HeroLoginForm } from "@/components/auth/HeroLoginForm";
export const metadata = {
  title: "Sign up — YRDLY",
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
            Your neighbourhood.
            <br />
            <em>Your people.</em>
          </h1>
          <p>
            Make a little more of the place you call home. Join YRDLY and start
            exploring.
          </p>
        </div>
        <HeroLoginForm initialMode="signup" />
      </main>
      <Footer />
    </>
  );
}
