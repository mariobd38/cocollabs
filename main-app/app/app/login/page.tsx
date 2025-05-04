import { AuthForm } from "@/components/auth";
import { authText } from "@/utils/auth-text";


export default function Login() {
    return (
        <div className="w-[90%] max-w-[460px] m-auto py-40">
            <AuthForm header={'Login to Cocollabs'} alt={authText.login} />
        </div>
        // <Waitlist />
    );
}