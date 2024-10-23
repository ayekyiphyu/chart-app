import SignUpPage from "@/components/singup/useSignup";
import { useRouter } from "next/router";

export const SignUp = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <SignUpPage />
    </div>
  );
};

export default SignUp;
