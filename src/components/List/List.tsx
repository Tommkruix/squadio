import React, { FC } from 'react';

import Button from '@/components/Button/Button';
import { UserDataType } from '@/models/user';

interface Props {
    items: UserDataType[];
    onDelete: (id: number) => void
}

const List: FC<Props> = ({items, onDelete, ...props}) => {
  return (
        <ul id='ul' {...props}>
          {
            items && items.length > 0 && items.map((item: UserDataType) => (
              <div id='item' key={item.id}>
              <li>{item.value}</li> 
              <div>
              <Button onClick={() => onDelete(item.id)} label='Delete' />
              </div>
              </div>
            ))
          }
        </ul>
  );
};


export default List;
