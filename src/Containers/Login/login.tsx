import * as React from 'react';
import SignIn from '../../Components/Login/loginComponent';
import './login.scss'

export interface IAppProps {
}

export function LoginPage (props: IAppProps) {
  return (
    <div >
      <SignIn/>
    </div>
  );
}
