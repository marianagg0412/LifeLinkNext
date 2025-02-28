import { tw } from "twind";


export default function NButton({
    label,
    onClick,
    className,
    type = "button",
    disabled = false,
}: {
    label: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={tw`{className}`}
        >
            {label}
        </button>
    );
}
