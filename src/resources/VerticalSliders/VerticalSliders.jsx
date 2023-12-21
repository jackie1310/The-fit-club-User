import { useContext, useRef } from "react";
import "./VerticalSliders.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerticalSlider() {
    const {userInfo} = useContext(UserContext);
    const [report, setReport] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [waist, setWaist] = useState("");
    const [hip, setHip] = useState("");
    const [age, setAge] = useState("");

    async function sendStat(e) {
        e.preventDefault();
        if (userInfo?.pro) {
            setIsLoading(true);
            const data = {height, weight, waist, hip, age}
            axios.post("http://localhost:5000/receive", data).then(response => {
                setReport(response.data);
                setIsLoading(false);
            })
        }
        else {
            toast.warn("Upgrading to Pro to use", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    return (
        <div className="resource">
            <div className="left-slide">
                <h1>Enter your stats</h1>
                <form onSubmit={sendStat}>
                    <input type="number" placeholder="Height(m)" value={height} onChange={e => setHeight(e.target.value)}/>
                    <input type="number" placeholder="Weight(kg)" value={weight} onChange={e => setWeight(e.target.value)}/>
                    <input type="number" placeholder="Waist(cm)" value={waist} onChange={e => setWaist(e.target.value)}/>
                    <input type="number" placeholder="Hip(cm)" value={hip} onChange={e => setHip(e.target.value)}/>
                    <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
            <div className="right-slide">
                <h1>Your report</h1>
                {isLoading && <LoaderComponent/>}
                {typeof report === "string" && <TypeTextComponent report={report}/>}
                <button onClick={() => setReport()}>Thank you</button>
            </div>
            <ToastContainer/>
        </div>
    )
}

const LoaderComponent = () => {
    const [dots, setDots] = useState('');
  
    useEffect(() => {
      const loadInterval = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots === '....') {
            return '';
          }
          return prevDots + '.';
        });
      }, 300);
  
      // Cleanup the interval when the component unmounts
      return () => clearInterval(loadInterval);
    }, []);
  
    return <p className="dots">{dots}</p>;
};

const TypeTextComponent = ({ report }) => {
    const [displayText, setDisplayText] = useState('');
    let index = 0;
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (index < report?.length) {
          setDisplayText((prevText) => prevText + report.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);
  
      // Cleanup the interval when the component is unmounted
      return () => clearInterval(interval);
    }, [report]);
  
    return <div className="text">{displayText}</div>;
  }