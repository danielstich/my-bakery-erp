import './Home.scss'
import { Switch, Route } from 'react-router-dom'
import { Component } from 'react';
import Inventory from '../../Components/Inventory/Inventory';
import axios from 'axios';

import Header from '../../Components/Header/Header';
import Toolbar from '../../Components/Toolbar/Toolbar';

export default class Home extends Component {
  state = {
    isLoggedIn: false,
    isVerifying: true,
    user: null
  }

  componentDidMount = () => {
    const token = sessionStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
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
    const url = this.props.match.url;
    return (
      <div className='Home'>
        <Header />
        <div className='Home__Container'>
          <div className='Home__Switch'>
            {this.state.isLoggedIn && 
            <Switch>
              <Route path={url + '/inventory'} component={Inventory} />
              {/* <Route path={url + '/Batches'} Component={Batches} /> */}
              {/* <Route path={url + '/Recipes'} Component={Recipes} /> */} 
            </Switch>
            }
          </div>
          {this.state.isLoggedIn && <Toolbar />}
        </div>
      </div>
    )
  }
}
