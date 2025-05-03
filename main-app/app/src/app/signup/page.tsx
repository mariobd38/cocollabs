import { AuthForm } from "@/components/auth";
import { authText } from "@/utils/auth-text-";


export default function Signup() {
  return (
    <div className="w-[90%] max-w-[460px] m-auto py-45">
      <AuthForm header={'Welcome to Cocollabs'} alt={authText.signup} />
    </div>
  );
}