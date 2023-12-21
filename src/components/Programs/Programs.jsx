import './Programs.css'
import { programsData } from '../../data/programsData';
import RightArrow from '../../assets/rightArrow.png'

export default function Programs() {
    return (
        <div className='Programs' id='programs'>
            {/* Tiêu đề */}
            <div className='programs-header'>
                <span className='stroke-text'>Explore our</span>
                <span>Programs</span>
                <span className='stroke-text'>to shape you</span>
            </div>
            {/* Phần thể loại */}
            <div className='program-categories'>
                {/* Dùng map đi qua programsData và render từng phần một*/}
                {programsData.map((program, i) => (
                    <div className='category' key={i}>
                        {program.image}
                        <span>{program.heading}</span>
                        <span>{program.details}</span>
                        <div className='join-now'><span>Join Now</span><img src={RightArrow} alt=''/></div>
                    </div>
                ))}
            </div>
        </div>
    )
}