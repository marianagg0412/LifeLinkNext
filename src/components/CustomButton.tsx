import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  onAcceptTerms?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  onClick,
  onAcceptTerms,
}) => {
  const handleClick = () => {
    if (onAcceptTerms) {
      onAcceptTerms();
    }
    onClick?.();
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};

export default CustomButton;
