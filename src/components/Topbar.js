import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import MessagesMenu from './MessagesMenu';
import NotificationsMenu from './NotificationsMenu';
import AccountMenu from './AccountMenu';
import Logo from './Logo';
import '../styles/Topbar.css';

function Topbar() {
    return (
        <header className='topbar-container'>
            <ul>
                <li>
                    <Sidebar />
                    {/* <IconButton aria-label='menu'>
                        <MenuIcon />
                    </IconButton> */}
                </li>
                <li>
                    <Link to='/'>
                        <div className='logo-brand-container'>
                            <Logo />
                            <p className='brand-name'>MoveForward</p>
                        </div>
                    </Link>
                </li>
                <li>
                    <SearchBar />
                </li>
            </ul>
                
            <ul>
                <li className='hide-mobile'>
                    <MessagesMenu />
                </li>
                <li className='hide-mobile'>
                    <NotificationsMenu />   
                </li>
                <li>
                    <AccountMenu />
                </li>
            </ul>
        </header>
    );
}

export default Topbar;