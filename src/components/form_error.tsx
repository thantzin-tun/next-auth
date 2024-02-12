import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormErrorProps {
    message?: String;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
    if (!message) return null;
    return (
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    );
};

export default FormError;
