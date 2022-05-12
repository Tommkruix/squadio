import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import List from '@/components/List/List';

import { UserDataType, UserInputType } from '@/models/user';

const randomNumber: number = Math.floor(Math.random() * 9) + 1;
let lastId: number = 1

const App = () => {

  const [userInput, setUserInput] = useState<UserInputType | any>({firstName: '', lastName: ''})
  const [result, setResult] = useState<string>('')
  const [data, setData] = useState<UserDataType[] | any>([])
  const [error, setError] = useState<string>('');

  useEffect(() => {
    onLoad()
  }, [])

  const onLoad = () => {
    setUserInput({
      firstName: 'Coder',
      lastName: 'Byte'
    })
  }

  const onChange = ({currentTarget}: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget
    let updated = {...userInput};
    updated[name] = value
    setUserInput({...updated})

    setError('')
    setResult('')
  }

  const onSubmit = (e: any) => {
    e.preventDefault();

    const { firstName, lastName } = userInput
    if(firstName.length > 0 && lastName.length > 0){
      handleSubmit()
    }else{
      setError('First name or Last name is empty')
    }
  }

  const handleSubmit = () => {
    const str = Object.keys(userInput).map(function (key) { 
      return `${userInput[key]}_`;
    }).join('');
    const lowerCaseStr = `${str.toLowerCase()}${randomNumber}`
    setResult(lowerCaseStr)

    setData([...data, {id: lastId, value: lowerCaseStr}]);

    lastId++;
  }

  const onDelete = (id: number) => {
    const updated = data.filter((item: UserDataType) => item.id !== id)
    setData(updated)
  }
  
  return (
    <div id='app'>
      <CSSTransition
        in={ true }
        appear={ true }
        timeout={ 300 }
        mountOnEnter
      >
        <div id='main'>
          {error.length > 0 && <div>{error}</div>}
          <br/><br/>
          <form onSubmit={onSubmit}>
            <Input name='firstName' type='text' placeholder='First Name' onChange={onChange} />
            <br/><br/>
            <Input name='lastName' type='text' placeholder='Last Name' onChange={onChange} />
            <br/><br/>
            <Button label='Generate' />
          </form>
          <br/><br/>
          {result.length > 0 && <div>{result}</div>}
          <br/><br/>
          {data && data.length > 0 ? 
          <List items={data} onDelete={onDelete} /> 
          : 
          <div>no usernames generated yet</div>}
        </div>
      </CSSTransition>
    </div>
  );
};


export default App;
