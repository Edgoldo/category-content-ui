import React from 'react';
import classnames from 'classnames';

const Form = ({ children, onSubmit, className }) => {
  return (
    <div className="flex justify-center my-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <form onSubmit={onSubmit} className={className}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default Form;
