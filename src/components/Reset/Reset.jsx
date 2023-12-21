import { useState } from 'react';
import './Reset.css';
import emailjs from "@emailjs/browser";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
    const [sent, setSent] = useState(false);
    const [code, setCode] = useState("");
    return (
        <div className='reset'>
            {sent ? <SetNew code={code} setSent={setSent}/> : <SendingCode setCode={setCode} setSent={setSent}/>}
            <ToastContainer/>
        </div>
    )
}

function SendingCode ({setCode, setSent}) {
    const [email, setEmail] = useState('');
    async function sendCode(e) {
        e.preventDefault();
        toast.success("Sending code", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        const data = {
            user_email: email,
            code: generateRandomCode()
        }
        await emailjs.send('service_jpuqjwm', 'template_z2cbppl', data, 'jcsfDXyKu4PyGo48B')
        .then((result) => {
            console.log(result.text);
            setSent(true);
            setCode(data.code);
        }, (error) => {
            console.log(error.text);
        });
    }
    return (
        <div>
            <a href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
                Home
            </a>
            <h1>Enter your email</h1>
            <form onSubmit={sendCode}>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"/>
                <button>Send code</button>
            </form>
        </div>
    )
}

function SetNew({code, setSent}) {
    const [validCode, setValidCode] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    async function changePassword(e) {
        e.preventDefault();
        if (validCode === code) {
            toast.success("Updating your password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            const data = {email, newPassword};
            await axios.post("http://localhost:8080/users/change", data).then(response => {
                if (response.status === 200) {
                    window.location = '/';
                }
                else {
                    toast.error(response.data, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
        }
        else {
            toast.error("Incorrect pass Code", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div className='new'>
            <button onClick={() => setSent(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
                Back
            </button>
            <h1>Reset your password</h1>
            <form onSubmit={changePassword}>
                <input type='text' value={validCode} onChange={e => setValidCode(e.target.value)} placeholder='Enter the code'/>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email'/>
                <input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder='Enter your new password'/>
                <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm your new password'/>
                <button>Update Password</button>
            </form>
        </div>
    )
}

function generateRandomCode() {
    // Generate two 32-bit numbers
    const highPart = Math.floor(Math.random() * Math.pow(2, 32));
    const lowPart = Math.floor(Math.random() * Math.pow(2, 32));
  
    // Convert each part to a hexadecimal string
    const highHex = highPart.toString(16).toUpperCase();
    const lowHex = lowPart.toString(16).toUpperCase();
  
    // Ensure each string has exactly 8 characters (32 bits)
    const paddedHighHex = '0'.repeat(8 - highHex.length) + highHex;
    const paddedLowHex = '0'.repeat(8 - lowHex.length) + lowHex;
  
    // Concatenate the two parts to get a 64-bit hexadecimal code
    const fullHexCode = paddedHighHex + paddedLowHex;
  
    return fullHexCode;
  }