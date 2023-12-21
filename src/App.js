import { useParams } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Founders from './components/Founders/Founders';
import Hero from './components/Hero/Hero';
import Join from './components/Join/Join';
import Plans from './components/Plans/Plans';
import Programs from './components/Programs/Programs';
import Reasons from './components/Reasons/Reasons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {status} = useParams();
  if (status === "success") {
    toast.success("Subscription completed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  };
  return (
    <div className="App">
        <Hero/>
        <Programs/>
        <Reasons/>
        <Plans/>
        <Founders/>
        <Join/>
        <Footer/>
        <ToastContainer/>
    </div>
  );
}

export default App;
