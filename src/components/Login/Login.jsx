import { useRef, useState } from "react"
import "./Login.css"
import emailjs from '@emailjs/browser';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login () {
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const form = useRef();
    const ls = typeof window !== "undefined" ? window.localStorage : null;

    async function signup(ev) {
        ev.preventDefault();
        /* Khi người dùng đăng ký tài khoản mới, thông tin đăng ký sẽ được xử lý ở đây bằng cách 
        đưa về BackEnd nếu username đã có trong mongo database, backend sẽ truyền json file chứa thông tin người dùng */
        const data = {name, email, password};
        await axios.post("http://localhost:8080/users/signup", data).then(async response => {
            if (response.status === 200) {
                ls?.setItem('user', JSON.stringify(response.data));
                toast.success("Account created!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                await emailjs.sendForm('service_jpuqjwm', 'template_xm4zqii', form.current, 'jcsfDXyKu4PyGo48B')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
                window.location = '/'
            }
            else if (response.status === 202) {
                toast.error(`${response.data}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        })
    }
    async function login(ev) {
        ev.preventDefault();
        /* Login khi login sẽ được xử lý ở đây bằng cách đưa về BackEnd
        nếu đúng username và password, backend sẽ truyền json file chứa thông tin người dùng */
        const data = {email, password};
        
        await axios.post("http://localhost:8080/users/login", data).then(response => {
            if (response.status === 200) {
                ls?.setItem('user', JSON.stringify(response.data))
                toast.success("Welcome back!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                window.location = '/';
            }
            else if (response.status === 202) {
                toast.error(`${response.data}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        })
    }
    return (
        <main id="form">
            {window.innerWidth > 768 
                ? (<div className={`container ${isSignUpActive ? "active" : ""}`} id="container">
                        <div className="form-container sign-up">
                            <form ref={form} onSubmit={signup}>
                                <h1>Create Account</h1>
                                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                                <input type="email" placeholder="Email" name="user_email" value={email} onChange={e => setEmail(e.target.value)}/>
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                <button>Sign Up</button>
                            </form>
                        </div>
                        <div className="form-container sign-in">
                            <form onSubmit={login}>
                                <h1>Sign In</h1>
                                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                <a href="/reset-password">Forget Your Password?</a>
                                <button>Sign In</button>
                            </form>
                        </div>
                        <div className="toggle-container">
                            <div className="toggle">
                                <div className="toggle-panel toggle-left">
                                    <h1>Welcome Back!</h1>
                                    <p>Get back to your journey</p>
                                    <button className="hidden" id="login" onClick={() => setIsSignUpActive(false)}>Sign In</button>
                                </div>
                                <div className="toggle-panel toggle-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Start your journey with us</p>
                                    <button className="hidden" id="signup" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>) 
                :  (<div className="mobile">
                        {isSignUpActive 
                            ? (
                                <form ref={form} onSubmit={signup}>
                                    <h1>Create Account</h1>
                                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                    <button>Sign Up</button>
                                    <p>If you have an account</p>
                                    <button onClick={() => setIsSignUpActive(false)}>Sign in</button>
                                </form>
                            )
                            : (
                                <form onSubmit={login}>
                                    <h1>Sign In</h1>
                                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                                    <a href="/reset-password">Forget Your Password?</a>
                                    <button>Sign In</button>
                                    <p>You don't have an account!</p>
                                    <button onClick={() => setIsSignUpActive(true)}>Sign Up</button>
                                </form>
                            )
                        }
                    </div>)
            }
            <ToastContainer/>
        </main>
    )
}