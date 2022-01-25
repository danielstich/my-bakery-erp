import './Home.scss'
import { Link, Redirect } from 'react-router-dom'
import { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  state = {
    isLoggedIn: false,
    isVerifying: true,
    user: null
  }

  // logout = () => {
  //   sessionStorage.removeItem('token');
  //   this.setState({token: ''})
  // }
  componentDidMount = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          isLoggedIn: true,
          isVerifying: false,
          user: response.data
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({isVerifying: false})
      })
    } else {
      this.setState({isVerifying: false})
    }
  }

  render() {
    if (!this.state.isVerifying && !this.state.isLoggedIn) return <Redirect to="/login" />;
    if (!this.state.isVerifying && this.state.isLoggedIn) {
      return (
        <div className='Home'>
            <Link to='/Signup' >Signup</Link>
            {!this.state.token && <Link to='/Login' >Login</Link>}
            {this.state.token &&<p onClick={this.logout}>Logout</p>}
        </div>
      )
    }
    return <></>
  }
}
