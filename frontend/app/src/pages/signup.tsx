import { AuthForm } from "@/components/auth-form";
import { authText } from "@/utils/auth-text";


export default function Signup() {

    return (
        <div className="w-[90%] max-w-[460px] m-auto py-40">
            <AuthForm header={'Get Started with Cocollabs'} alt={authText.signup} />
        </div>
    );
}