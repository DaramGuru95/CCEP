import React from "react";
const Button = ({
  handleClick,
  className,
  name,
  children,
}: {
  handleClick?: any;
  className: string;
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
