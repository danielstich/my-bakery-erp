import { Component } from 'react';
import { Link } from 'react-router-dom';
import crescent from '../../Assets/Icons/bakery_dining_white_24dp.svg';
import menu from '../../Assets/Icons/menu_white_24dp.svg';
import openMenu from '../../Assets/Icons/menu_open_white_24dp.svg';
import './Header.scss'

export default class Header extends Component {
    state = {
        navClass: 'Header__Nav',
        navIsVisible: false
    }

    showMenu = () => {
        this.setState({
            navClass: 'Header__Nav Header__Nav--visible',
            navIsVisible: true
        })
    }

    hideMenu = () => {
        this.setState({
            navClass: 'Header__Nav',
            navIsVisible: false
        })
    }

    render() {
        return (
            <div className='Header'>
                <div className='Header__Container'>
                    <Link className='Header__Link Header__Link--logo' onClick={() => window.location.reload()} to='/home'><img className='Header__Icon Header__Icon--logo' src={crescent} alt="crescent logo" /></Link>
                    <Link className='Header__Link Header__Link--logo' onClick={() => window.location.reload()} to='/home'><h1 className='Header__Title'>My Bakery</h1></Link>
                    <img 
                        onClick={this.state.navIsVisible ? this.hideMenu : this.showMenu} 
                        className='Header__Icon Header__Icon--menu' 
                        src={this.state.navIsVisible ? openMenu : menu} 
                        alt="crescent logo" />
                    <div className='Header__Nav Header__Nav--tablet'>
                        <Link className='Header__Link' onClick={() => window.location.reload()} to='/home'>Home</Link>
                        <Link className='Header__Link' to='/Signup' >Sign Up</Link>
                        <Link className='Header__Link' to='/Login' >Login</Link>
                    </div>
                </div>
                <div className={this.state.navClass}>
                    <Link className='Header__Link' onClick={() => window.location.reload()} to='/home'>Home</Link>
                    <Link className='Header__Link' to='/Signup' >Sign Up</Link>
                    <Link className='Header__Link' to='/Login' >Login</Link>
                </div>
            </div>
        )
    }
}
