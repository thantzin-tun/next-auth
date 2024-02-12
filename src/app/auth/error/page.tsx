import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthError = () => {
    return (
        <div>
            Your email is already connect some provider
            <Link href="/auth/login">
                <Button>Back to login</Button>
            </Link>
        </div>
    );
};

export default AuthError;
