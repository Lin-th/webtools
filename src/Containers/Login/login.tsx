import * as React from 'react';
import SignIn from '../../Components/Login/loginComponent';
import './login.scss'

export interface IAppProps {
}

export function LoginPage (props: IAppProps) {
  return (
    <div >
      <SignIn/>
      <style jsx>{`
         html {
             background: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%) no-repeat center center fixed;
           }
          body{
            background: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%) no-repeat center center fixed;
          }
          
          .center {
            display: block;
            margin-left: auto;
            margin-right: auto;
             width: 50%;
          }
     `}</style>
    </div>
  );
}
