import { tw } from "twind"

const OrderCard = ({ 
    title,
    date
} : {
    title: string,
    date: string
}) => {
    return (
        <div className={tw`w-40 h-40 bg-gradient-to-br from-blue-200 to-beige-100 rounded-2xl p-4 shadow-md relative flex flex-col justify-between`}>
        <p className={tw`text-sm font-semibold text-gray-800`}>{title}</p>
        <div className={tw`w-10 h-10 bg-black rounded-full flex items-center justify-center absolute bottom-4 right-4`}>
        <p></p>
        </div>
      </div>
    )

}