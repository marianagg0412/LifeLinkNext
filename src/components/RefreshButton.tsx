import { useRouter } from "next/router";
import { tw } from "twind";

const MyButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/main').then(() => {
            router.reload();
        });
    };

    return (
        <button
            className={tw(`absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200`)}
            onClick={handleClick}
        >
            Retornar a menu
        </button>
    );
};

export default MyButton;
