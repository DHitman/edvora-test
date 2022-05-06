import styles from './Navbar.module.css';
import logo from '../../assets/logo.svg';
import { useStore } from '../../Context/Store';


export const NavrBar = () => {

    // style classes
    const { _logo, _avatar, name,  row, main_nav } = styles;
    const { user } = useStore();

    return (
        <nav className={main_nav} >
            <div className="--container">
                <div className={row}>

                    <div className={_logo} >
                        <img src={logo} alt="logo" />
                    </div>


                    {
                        <div className={row}>
                            <p className={name} >{user.name}</p>
                            {/* <p className={station_code} >{user.station_code}</p> */} 
                            {/* if you want to check the station_code of the user */}

                            <div className={_avatar} >
                                <img src={user.url} alt="avatar" />
                            </div>
                        </div>
                    }


                </div>
            </div>
        </nav>
    );
};