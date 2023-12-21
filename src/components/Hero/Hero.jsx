import Header from '../Header/Header';
import './Hero.css';
import hero_image from '../../assets/hero_image.png';
import hero_image_back from '../../assets/hero_image_back.png';
import Heart from '../../assets/heart.png';
import Calories from '../../assets/calories.png';
import {motion} from 'framer-motion';
import NumberCounter from 'number-counter';
import { Link } from 'react-scroll';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Hero () {
    const transition = {type: 'spring', duration: 3};
    const mobile = window.innerWidth <=768 ? true : false;
    const {userInfo} = useContext(UserContext);
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    function logout () {
        if (ls && ls.getItem('user')) {
            ls?.removeItem('user');
        }
        toast('Logging out!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: "dark",
        });
        window.location = '/';
    }
    return (
        <div className='hero' id='home'>
            {/* Phần bên trái */}
            <div className="blur hero-blur"></div>
            
            <div className='left-h'>
                <Header/>
                {/* Quảng cáo cho trang web */}
                <div className='the-best-ad'>
                    {/*Tạo animation để cho khúc màu cam di chuyển từ phải sang trái */}
                    <motion.div
                        initial={{left: mobile ? '130px' : '180px'}}
                        whileInView={{left: '8px'}}
                        transition={{...transition, type: 'tween'}}
                    ></motion.div>
                    <span>The best fitness club in UIT</span>
                </div>
                {/*Heading chính của trang web*/}
                <div className='hero-text'>
                    <div> {/* 1 */}
                        <span className='stroke-text'>Shape </span>
                        <span>Your</span>
                    </div>
                    <div> {/* 2 */}
                        <span>Ideal body</span>
                    </div>
                    <div> {/* 3 */}
                        <span>
                            In here we will help you to shape and build your ideal body and live up your life to fullest
                        </span>
                    </div>
                </div>
                {/* Thông tin giới thiệu */}
                <div className='figures'>
                    <div>
                        <span>
                            <NumberCounter end={140} start={70} delay='4' preFix="+"/>
                        </span>
                        <span>expert coach</span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={978} start={700} delay='4' preFix="+"/>
                        </span>
                        <span>members joined</span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={50} start={10} delay='4' preFix="+"/>
                        </span>
                        <span>fitness programs</span>
                    </div>
                </div>
                {/* Các nút bấm */}
                <div className='hero-buttons'>
                    <a href='/resources' className='btn'>Get Started</a>
                    {typeof userInfo === "object" && <a href={`/account/${userInfo?._id}`} className='btn'>Your account</a>}
                </div>
            </div>
            {/* Phần bên phải */}
            <div className='right-h'>
                {/* Phần hiện nút Join Now */}
                {(typeof userInfo === 'object') 
                    ? <button className='btn' onClick={logout}>Logout</button> 
                    : <Link 
                        className='btn'
                        to='form'
                        smooth={true}
                        >Join now
                    </Link>
                }
                
                {/* Phần hiện chỉ số nhịp tim */}
                {/* Tạo animation di chuyển từ phải sang trái cho phần nhịp tim */}
                <motion.div 
                    initial={{right: "-1rem"}}
                    whileInView={{right: "4rem"}}
                    transition={transition}
                    className='heart-rate'>
                    <img src={Heart} alt=''/>
                    <span>Heart Rate</span>
                    <span>116 bpm</span>
                </motion.div>
                {/* Phần ảnh minh họa */}
                <img src={hero_image} alt='' className='hero-image'/>
                <motion.img
                    initial={{right: '11rem'}}
                    whileInView={{right: '20rem'}}
                    transition={transition}
                    src={hero_image_back} alt='' className='hero-image-back'/>
                {/* Calories (minh họa) */}
                {/* Tạo animation di chuyển từ trái sang phải cho Calories*/}
                <motion.div 
                    initial={{right: "37rem"}}
                    whileInView={{right: "28rem"}}
                    transition={transition}
                    className='calories'
                >
                    <img src={Calories} alt=''/>
                    <div>
                        <span>Calories Burned</span>
                        <span>220 kcal</span>
                    </div>
                </motion.div>
            </div>
            <ToastContainer/>
        </div>
    )
}