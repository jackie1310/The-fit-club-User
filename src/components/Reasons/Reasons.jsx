import "./Reasons.css";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import nb from "../../assets/nb.png";
import adidas from "../../assets/adidas.png";
import nike from "../../assets/nike.png";
import tick from "../../assets/tick.png";

export default function Reasons() {
    return (
        <div className="Reasons" id="reasons">
            {/*Phần bên trái*/}
            <div className="left-r">
                <img src={image1} alt=""/>
                <img src={image2} alt=""/>
                <img src={image3} alt=""/>
                <img src={image4} alt=""/>
            </div>
            {/*Phần bên phải*/}
            <div className="right-r">
                {/* Tiêu đề */}
                <span>some reasons</span>
                <div>
                    <span className="stroke-text">why</span>
                    <span> choose us?</span>
                </div>
                {/* Lý do thuyết phục */}
                <div className="details-r">
                    <div>
                        <img src={tick} alt=""/>
                        <span>OVER 140+ EXPERT COACHS</span>
                    </div>
                    <div>
                        <img src={tick} alt="" />
                        <span>TRAIN SMARTER AND FASTER THAN BEFORE</span>
                    </div>
                    <div>
                        <img src={tick} alt="" />
                        <span>SOURCE OF VIDEOS FROM BEGINNER TO PRO</span>
                    </div>
                    <div>
                        <img src={tick} alt="" />
                        <span>RELIABLE PARTNERS</span>
                    </div>
                </div>
                {/* Giới thiệu các đối tác */}
                <span 
                    style={{
                        color: 'var(--gray)',
                        fontWeight: "normal",
                    }}
                >
                    OUR PARTNERS
                </span>
                {/* Phần ảnh của các partners*/}
                <div className="partners">
                    <img src={nb} alt="" />
                    <img src={adidas} alt="" />
                    <img src={nike} alt="" />
                </div>  
            </div>
        </div>
    )
}