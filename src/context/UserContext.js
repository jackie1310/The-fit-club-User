import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [userInfo, setUserInfo] = useState();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (ls && ls?.getItem("user")) {
            const data = JSON.parse(ls.getItem('user'));
            const id = data._id;
            axios.get(`https://the-fit-club-backend.onrender.com/users/${id}`).then(response => {
                if (response.status === 202) {
                    setUserInfo();
                }
                else {
                    setUserInfo(response.data);
                }
            });
        }
    }, [ls]);
    useEffect(() => {
        axios.get("https://the-fit-club-backend.onrender.com/data/vid").then(response => setVideos(response.data));
    }, []);
    return (
        <UserContext.Provider value={{userInfo, setUserInfo, videos}}>
            {children}
        </UserContext.Provider>
    )
}