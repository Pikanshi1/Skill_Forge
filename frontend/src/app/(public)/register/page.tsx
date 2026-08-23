import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join thousands of learners building AI-powered courses."
    >
      <RegisterForm />
    </AuthLayout>
  );
}