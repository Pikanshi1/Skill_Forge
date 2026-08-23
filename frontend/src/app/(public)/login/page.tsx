import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Sign in to continue your AI learning journey."
    >
      <LoginForm />
    </AuthLayout>
  );
}