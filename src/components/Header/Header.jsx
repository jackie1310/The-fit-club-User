import './Header.css'
import Logo from '../../assets/logo.png';
import Bars from '../../assets/bars.png';
import { useState } from 'react';
import { Link } from 'react-scroll';

export default function Header() {

    const mobile = window.innerWidth <= 768 ? true : false;
    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <div className='header'>
            <img src={Logo} alt="logo" className='logo'/>
            {(menuOpened === false && mobile===true) ? (
                <div 
                    style={{
                        backgroundColor: 'var(--appColor', 
                        padding: '0.5rem', 
                        borderRadius: '5px'
                    }}
                    onClick={() => setMenuOpened(true)}
                    >
                    <img src={Bars} alt="" style={{width: '1.5rem', height: '1.5rem'}}/>
                </div>
            ): (
                <ul className='header-menu'>
                    <li>
                        <Link
                            onClick={() => setMenuOpened(false)}
                            activeClass='active'
                            to='home'
                            smooth={true}
                        >Home</Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => setMenuOpened(false)}
                            to='programs'
                            smooth={true}
                        >Programs</Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => setMenuOpened(false)}
                            to='reasons'
                            smooth={true}
                        >Why us</Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => setMenuOpened(false)}
                            to='plans'
                            smooth={true}
                        >Plans</Link>
                    </li>
                    <li>
                        <Link 
                            onClick={() => setMenuOpened(false)}
                            to='founders'
                            smooth={true}
                        >About us</Link>
                    </li>
                </ul>
            )}
            
        </div>
    )
}