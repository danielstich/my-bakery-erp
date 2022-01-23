import './Home.scss'
import { Link } from 'react-router-dom'
import { Component } from 'react';

export default class Home extends Component {
  state = {token: sessionStorage.getItem('token') || ''}

  logout = () => {
    sessionStorage.removeItem('token');
    this.setState({token: ''})
  }

  render() {
    return (
      <div className='Home'>
          <Link to='/Signup' >Signup</Link>
          {!this.state.token && <Link to='/Login' >Login</Link>}
          {this.state.token &&<p onClick={this.logout}>Logout</p>}
      </div>
    )
  }
}
