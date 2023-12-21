import "./Founders.css";
import { foundersData } from "../../data/foundersData";
import { useState } from "react";
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';
import {motion} from 'framer-motion';

export default function Founders() {
    const transition = {type: "spring", duration: 3};
    const [selected, setSelected] = useState(0); /* Biến đếm số trang */
    const length = foundersData.length; /* length bằng số phần tử có trong array foundersData */

    return (
        <div className="founders">
            {/* Phần bên trái bao gồm name, comment, và role */}
            <div className="left-f">
                <span>Co-Founders</span>
                <span className="stroke-text">of </span>
                <span>The fit club</span>
                {/* Phần comment để riêng */}
                <motion.span
                    key={selected}
                    initial={{opacity: 0, x: -100}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 100}}
                    transition={transition}
                >
                    {foundersData[selected].comment}
                </motion.span>
                {/*Phần name và role để chung */}
                <span>
                    <span style={{color: 'var(--orange)'}}>
                        {foundersData[selected].name} 
                    </span>{" "}
                    - {foundersData[selected].role}
                </span>
            </div>
            {/* Phần bên phải bao gồm Hình và mũi tên qua lại */}
            <div className="right-f">
                {/* Phần tạo hiệu ứng với hình */}
                <motion.div
                    initial={{opacity: 0, x: -100}}
                    transition={{...transition, duration: 2}}
                    whileInView={{opacity: 1, x: 0}}
                ></motion.div>
                <motion.div
                    initial={{opacity: 0, x: 100}}
                    transition={{...transition, duration: 2}}
                    whileInView={{opacity: 1, x: 0}}
                ></motion.div>
                <motion.img 
                    key={selected}
                    initial={{opacity: 0, x: 100}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: -100}}
                    transition={transition}
                    src={foundersData[selected].image} alt="/"/>
                {/* Phần mũi tên */}
                <div className="arrows">
                    {/* leftArrow là nút lùi page */}
                    {/* Logic lùi page */}
                    <img 
                        onClick={() => {
                            selected===0 
                                ? setSelected(length - 1) 
                                : setSelected((prev) => prev - 1)
                        }}
                        src={leftArrow} 
                        alt=""
                    />
                    {/* rightArrow là nút tới */}
                    {/* Logic tăng page */}
                    <img 
                        onClick={() => {
                            selected === length - 1 
                                ? setSelected(0)
                                : setSelected((prev) => prev + 1);
                        }}
                        src={rightArrow} 
                        alt="/"
                    />
                </div>
            </div>
        </div>
    )
}