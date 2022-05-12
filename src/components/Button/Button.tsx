import React, { FC } from 'react';

interface Props {
    label: string;
    onClick?: any
}

const Button: FC<Props> = ({label, onClick, ...props}) => {
  
  return (
    <button onClick={onClick} id='button' {...props} >{label}</button>
  );
};


export default Button;
