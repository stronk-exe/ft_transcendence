import './navBarTwo.css'
import { Link, useNavigate } from "react-router-dom"
import  { useEffect, useState } from 'react';
import { useClient } from '@/context/clientContext';
import Client from '@/components/ClientClass/client';
import axios from 'axios';


function NavBarTwo (props:any) {

    const { client, updateClient }  = useClient();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [orientation, setOrientation] = useState<number>(window.orientation);
    const [isNotificOpen, setIsNotificOpen] = useState(false);
    const [listItems, setListItems] = useState<JSX.Element>();
    const navigate = useNavigate();

    const open =  document.querySelector('.drop-menu2') as HTMLElement;

    const listNotific:JSX.Element = (
    <>
        <div className='notifics' >
            <img src="/src/imgs/example.jpg" alt="hlwa" />
            <span id='notific-user' >hamid</span>
            <span id='notific-title'>Friend</span>
            <button id='accept'> </button>
            <button id='refuse'></button>
            </div>
        <div className='notifics' ></div>
        <div className='notifics' ></div>
        <div className='notifics' ></div>
        <div className='notifics' ></div>
        <div className='notifics' ></div>
        <div className='notifics' ></div>
        <div id='notifics' ></div>
        <div className='notifics' ></div>
    </>
    )


    const toggleNotific = () => setIsNotificOpen(!isNotificOpen);



    const handleLogout = async() => {
        try {
            await axios.get(`http://${import.meta.env.VITE_BACK_ADDRESS}/auth/logout`, 
                {withCredentials: true,}
            )
        } catch (error) {
            console.error('Error logout: ', error);
        }
        updateClient(new Client);
        navigate('/')
    }

    const toggleMenu = () => {
        // console.log('----------');
        if (!open)
            return ;
        if (!isMenuOpen){
            open.style.height = '0px';
        }
        else {
            console.log('container : ', orientation);
            if (!window.matchMedia('(orientation: landscape)').matches) {
                setListItems(
                    <>
                        <li key="home"> <Link to='/' > Home </Link> </li>
                        <li key="profile1"> <Link to='/profile' > Profile </Link> </li>
                        <li key="chat"> <Link to='/chat'> Chat </Link> </li>
                        <li key="play"> <Link to='/play' > Play </Link> </li>
                        <li key="leaderboard"> <Link to='/leaderboard' > Leaderboard </Link> </li>
                        <li key="logout" id="logout" onClick={handleLogout} >  LogOut </li>
                    </>)
                open.style.height = '250px'
            } else {
                setListItems(
                    <>
                        <li key="logout" id="logout"  onClick={handleLogout} >  LogOut  </li>
                    </>
                )
                open.style.height = '50px'
            }
        }
        // console.log('############ height : ',open.style.height);
    };

    const handleOrientationChange = () => { 
        toggleMenu();
        setOrientation(window.orientation);
    };

    useEffect(() => {

            console.log('kike')
        toggleMenu();
        window.addEventListener('resize', handleOrientationChange);
        return () => {
          window.removeEventListener('resize', handleOrientationChange);
        };
    }, [isMenuOpen]);

    // window.addEventListener('click', function(event) {
    //     console.log('qwwqwqwqwqwqwqqwqwqwqwqwq')
    //     const nameClass = event.target.className as string;
    //     if (nameClass !== 'notification' && nameClass !== 'user-img2') {
    //         setIsMenuOpen(false)
    //         setIsNotificOpen(false);
    //     }
    // });

    return ( 
        <>
            <div className='NavBarTwo'>
                <Link to='/' >
                    <img className='logo-img1'  src="/src/imgs/mskota.png" alt="Mskota-logo" />
                </Link>
                <div className='right-bar'>
                    <img className='notification' src="/src/imgs/notification.png" alt="Notification" onClick={toggleNotific} />
                    <div className={`drop-notification ${isNotificOpen ? 'open-notific' : ''}`}>
                        {listNotific}
                    </div>
                    <img className='user-img2' src={client.avatar} alt="user-img" onClick={() => {setIsMenuOpen(!isMenuOpen)}} />
                </div>
                <div className="drop-menu2" >
                    {listItems}
                </div>
            </div>
        </>
    )

}


export default NavBarTwo;