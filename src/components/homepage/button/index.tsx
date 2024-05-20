import { tw } from 'twind';
import { useRouter } from 'next/router';

interface IButton {
  primary?: boolean;
  children: React.ReactNode;
  modifier?: string;
  navigateTo?: string; // Add navigateTo prop
}

const Button = ({ primary, modifier, children, navigateTo, ...rest }: IButton) => {
  const router = useRouter();
  const baseStyle = `font-sans font-medium py-2 px-4 border rounded`;
  const styles = primary
    ? `bg-[#FF5A5A] text-white border-[#FF5A5A] hover:bg-[#FF5A5A]`
    : `bg-white text-gray-600 border-gray-300 hover:bg-gray-100`;

  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo);
    }
  };

  return (
    <button
      type="button"
      className={tw(`${baseStyle} ${styles} ${modifier ?? ``}`)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
