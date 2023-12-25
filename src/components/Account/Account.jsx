import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./Account.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
    const {userInfo} = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pack, setPack] = useState(null);
    const [userVideos, setUserVideos] = useState();
    const [cancel, setCancel] = useState(false);
    const [render, setRender] = useState(false);
    const {id} = useParams();
    const not_yet = "You have not subscribed yet!";
    useEffect(() => {
        axios.get("https://the-fit-club-backend.onrender.com/users/" + id).then (response => {
            setName(response.data?.name);
            setEmail(response.data?.email);
            if (response.data?.basic) setPack("Basic Plan");
            else if (response.data?.premium) setPack("Premium Plan");
            else if (response.data?.pro) setPack("Pro Plan");
            else setPack(not_yet)
            setRender(true);
        })
    }, [userInfo])
    useEffect(() => {
        axios.get("https://the-fit-club-backend.onrender.com/videos/" + id).then(response => {
            setUserVideos(response.data);
        })
    }, [window.location]);

    async function deleteVideo(data) {
        const video = data._id;
        const user = userInfo._id;
        const userData = {video, user};
        await axios.put("https://the-fit-club-backend.onrender.com/videos/delete", userData);
        window.location.reload();
    }
    async function unsubscribe(e) {
        e.preventDefault();
        const data = {id};
        await axios.post('https://the-fit-club-backend.onrender.com/users/unsubscribe', data).then(response => {
            if (response.status === 200) {
                toast.success(`${response.data}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                window.location = '/';
            } else {
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
        setCancel(false)
    }
    
    return (
        <div className="account-container">
            {cancel && (
                <div>
                    <div className="cancel-bg">
                    </div>
                    <div className="cancel">
                        <h3>Do you really want to unsubscribe {pack}?</h3>
                        <div>
                            <button onClick={unsubscribe}>Yes</button>
                            <button onClick={() => setCancel(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="account">
                <div className="left-column">
                {window.innerWidth > 768 && <div className="account-blur"></div>}
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>
                        Home
                    </a>
                    <form>
                        <label>Name: </label>
                        <input type='text' value={name} disabled/>

                        <label>Email: </label>
                        <input type='email' value={email} disabled/>

                        <label>Package: </label>
                        <input type='text' value={pack} disabled/>

                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                window.location = "/reset-password"
                            }}>
                            Change  Your Password
                        </button>
                        <button onClick={(e) => {
                                e.preventDefault();
                                setCancel(true)
                            }}>
                            Unsubscribe Package
                        </button>
                    </form>
                </div>
                {render && <div className="right-column">
                    {pack === not_yet ? <p>Subscribe to save some exercises</p> : userVideos?.length > 0 
                        ? (userVideos.map((video, index) => (
                            <div className="table-user" key={index}>
                                <div>
                                    <p>{video.name}</p>
                                    <div>
                                        <p>{video.category}</p>
                                        <button onClick={() => deleteVideo(video)}>Delete Exercise</button>
                                    </div>
                                </div>
                                <div>
                                    <ReactPlayer controls url={video.link} height="120px" width="280px"/>
                                </div>
                            </div>
                            ))) 
                        : <p>No Video saved</p>
                    }
                </div>}
            </div>
            <Footer/>
            <ToastContainer/>
        </div>
    )
}