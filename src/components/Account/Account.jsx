import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import "./Account.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Footer from "../Footer/Footer";

export default function Account() {
    const {userInfo} = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pack, setPack] = useState("");
    const [userVideos, setUserVideos] = useState();
    const {id} = useParams();
    useEffect(() => {
        axios.get("http://localhost:8080/users/" + id).then (response => {
            setName(response.data?.name);
            setEmail(response.data?.email);
            if (response.data?.basic) setPack("Basic Plan");
            else if (response.data?.premium) setPack("Premium Plan");
            else if (response.data?.pro) setPack("Pro Plan");
            else setPack("You have not subscribed yet!")
        })
    }, [userInfo])
    useEffect(() => {
        axios.get("http://localhost:8080/videos/" + id).then(response => {
            setUserVideos(response.data);
        })
    }, [window.location]);

    async function deleteVideo(data) {
        const video = data._id;
        const user = userInfo._id;
        const userData = {video, user};
        await axios.put("http://localhost:8080/videos/delete", userData);
        window.location.reload();
    }
    
    return (
        <div className="account-container">
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
                    </form>
                </div>
                <div className="right-column">
                    {userVideos?.length > 0 
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
                                    <ReactPlayer url={video.link} height="120px" width="280px"/>
                                </div>
                            </div>
                            ))) 
                        : <p>No Video saved</p>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}