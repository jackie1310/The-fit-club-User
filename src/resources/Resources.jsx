import VerticalSlider from "./VerticalSliders/VerticalSliders";
import Videos from "./Videos/Videos";
import "./Resources.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Resources() {
    const {userInfo} = useContext(UserContext);
    const [valid, setValid] = useState(false);
    useEffect(() => {
        if (userInfo?.basic || userInfo?.premium || userInfo?.pro) setValid(true);
    }, [userInfo]);
    return (
        <div className="resources-container">
            <VerticalSlider/>
            <div>
                <a href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </svg>
                    Home
                </a>
                {(typeof userInfo === "object" && valid )
                    ? <Videos/> 
                    : <div className="invalid">
                            <span>Sign in</span>
                            <span>and</span>
                            <span className="stroke-text">Subscribe</span>
                            <span>to access</span>
                        </div>
                }
            </div>
        </div>
    )
}