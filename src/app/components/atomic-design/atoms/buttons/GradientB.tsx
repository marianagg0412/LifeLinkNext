
import { ShoppingBag } from "lucide-react"

export function GradientB({
    onClick,
    disabled=false,
    label
} : {
    onClick: () => void,
    disabled?:  boolean,
    label: string
}) {
    return (
        <button 
            onClick={onClick}
            type="button" 
            className={` w-4/5 text-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 inline-flex items-center justify-center gap-2 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}>
                <ShoppingBag/>
                {label}
            </button>
    )
}