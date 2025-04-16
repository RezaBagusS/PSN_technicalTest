import { CommentFormData, LoginFormData } from "@/types/IForm";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const ErrorInput = ({ message }: {
    message: string | FieldError | Merge<FieldError, FieldErrorsImpl<LoginFormData | CommentFormData>> | undefined;
}) => {

    if (!message) return null;

    const errorMessage = typeof message === "string" ? message : message.message || "Invalid input";

    return <p className="text-xs text-red-600">*{errorMessage.toString()}</p>;
};

export default ErrorInput;