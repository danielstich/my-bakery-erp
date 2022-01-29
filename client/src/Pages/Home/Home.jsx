import './Home.scss'
import { Switch, Route } from 'react-router-dom'
import { Component } from 'react';
import Inventory from '../../Components/Inventory/Inventory';
import Recipes from '../../Components/Recipe/Recipes';
import Batches from '../../Components/Batches/Batches';
import axios from 'axios';

import Header from '../../Components/Header/Header';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Alert from '../../Components/Alert/Alert';

export default class Home extends Component {
  state = {
    showAlert: false,
    alert: {
        type: '',
        msg: ''
    },
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

  alert = (alert) => {
    console.log(alert.msg)
    this.setState({
        showAlert: true,
        alert: alert
    }, () => {
        setTimeout(() => {
            console.log('hide message')
            this.setState({
                showAlert: false,
            })
        }, 2000)
    })
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
              <Route path={url + '/inventory'} render={(props)=> <Inventory {...props} alertHandler={this.alert} />} />
              <Route path={url + '/recipes'} render={(props)=> <Recipes {...props} alertHandler={this.alert} />} /> 
              <Route path={url + '/batches'} render={(props)=> <Batches {...props} alertHandler={this.alert} />} />
            </Switch>
            }
          </div>
          {this.state.isLoggedIn && <Toolbar />}
        </div>
        <Alert show={this.state.showAlert} alert={this.state.alert} />
      </div>
    )
  }
}
