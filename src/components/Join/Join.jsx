/*import { useRef } from 'react'*/
import './Join.css';
/*import emailjs from '@emailjs/browser';*/
import Login from '../Login/Login';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function Join() {
    const {userInfo} = useContext(UserContext);

    return (
        <div className="Join" id="join-us">
            <div className="left-j">
                <hr />
                <div>
                    <span className='stroke-text'>READY TO</span>
                    <span>LEVEL UP</span>
                </div>
                <div>
                    <span>YOUR BODY</span>
                    <span className='stroke-text'>WITH US?</span>
                </div>
            </div>
            {typeof userInfo === "object" && <WelcomeBack name={userInfo?.name}/>}
            {typeof userInfo === "undefined" && <Login/>}
        </div>
    )
}

function WelcomeBack ({name}) {
    return (
        <div className='welcome'>
            <h1>Welcome back {name}</h1>
            <a href='/resources' className='btn'>Get Started</a>
        </div>
    )
}