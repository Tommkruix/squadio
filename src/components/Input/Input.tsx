import React, { FC } from 'react';

interface Props {
    type: string,
    name: string,
    placeholder?: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const Input: FC<Props> = ({name, type, placeholder, onChange, ...props}) => {
  
  return (
        <input id='container' type={type} name={name} placeholder={placeholder} {...props} onChange={onChange} />
  );
};


export default Input;
