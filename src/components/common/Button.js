import React from 'react';
import classnames from 'classnames';

const Button = ({
  children,
  type = 'button',
  onClick,
  className
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
