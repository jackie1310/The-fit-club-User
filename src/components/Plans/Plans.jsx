import "./Plans.css";
import {plansData} from "../../data/plansData";
import whiteTick from "../../assets/whiteTick.png";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Plans() {
    const {userInfo} = useContext(UserContext);
    async function goToPayments(plan) {
        const prod_name = plan.name;
        const user = userInfo.email;
        const id = plan.id;
        const data = {prod_name,user, id}
        const response = await axios.post("http://localhost:8080/checkout", data);
        if (response.data.url) {
            window.location = response.data.url;
        }
    }
    return (
        <div className="plans-container" id="plans">
            <div className="blur plans-blur-1"></div>
            <div className="blur plans-blur-2"></div>
            {/* Tiêu đề */}
            <div className="programs-header" style={{gap: "2rem"}}>
                <span className="stroke-text">READY TO START</span>
                <span>YOUR JOURNEY</span>
                <span className="stroke-text">NOW WITH US</span>
            </div>
            {/* Các plans */}
            <div className="plans">
                {/* Dùng map đi qua plansData và render từng phần*/}
                {plansData.map((plan, i) => (
                    <div className="plan" key={i}>
                        {plan.icon}
                        <span>{plan.name}</span> {/* Phần tên */}
                        <span>$ {plan.price}</span> {/* Phần giá tiền */}
                        {/* Phần Feature */}
                        <div className="features">
                            {/* Dùng map đi qua phần features của từng phần và render từng feature*/}
                            {plan.features.map((feature, i) => (
                                <div className="feature" key={i}>
                                    <img src={whiteTick} alt="" />
                                    <span key={i}>{feature}</span>
                                </div>
                            ))}
                        </div>
                        {/* Nút này sẽ trực tiếp đưa đến phần thanh toán (hoạt động như Proceed to checkout)*/}
                        <button className="btn" onClick={() => goToPayments(plan)}>Join now</button> 
                    </div>
                ))}
            </div>
        </div>
    )
}