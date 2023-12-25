import ReactPlayer from "react-player";
import "./Videos.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SearchInput from "react-search-input";

export default function Videos () {
    const {userInfo, videos} = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [hovered, setHovered] = useState(-1);

    async function addVideo(data) {
        toast.success("Video saved into your account!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        const user_id = userInfo?._id;
        const _id = data._id;
        const user = {user_id, _id}
        await axios.post('https://the-fit-club-backend.onrender.com/videos/post', user)
    }
    const handleChange = (term) => {
        setSearchTerm(term);
    };

    const filteredData = videos.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="videos-container">
            <SearchInput className="search-input" onChange={handleChange} style={{padding: '8px', font: '16px', width: `${window.innerWidth > 768 ? "700px": "250px"}`}}/>
            <div className="videos">
                {filteredData.map((video, index) => (
                    <div className="table-video" key={index}>
                        <ReactPlayer controls url={video.link} height="120px" width="280px"/>
                        <p
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(-1)}
                            >{video.name}
                        </p>
                        <div>
                            <p>{video.category}</p>
                            <button onClick={() => addVideo(video)}>Save Exercise</button>
                        </div>
                        {hovered === index && <p className="hoverable">{video.desc}</p>}
                    </div>
                ))}
            </div>
            <ToastContainer/>
        </div>
    )
}