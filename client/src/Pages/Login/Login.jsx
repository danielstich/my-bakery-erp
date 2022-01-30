import { Component } from 'react';
import axios from 'axios'
import InputField from '../../Components/InputField/InputField'
import Button from '../../Components/Button/Button';
import Alert from '../../Components/Alert/Alert';
import './Login.scss'
import closeIcon from '../../Assets/Icons/close_black_24dp.svg'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    state = {
        user: {
            email: '',
            password: ''
        },
        isSuccess: false,
        showAlert: false,
        alert: {
            type: '',
            msg: ''
        },
    }

    onChangeHandler = (event) => {
        const { name, value} = event.target;
        const newState = {...this.state}
        newState.user[name] = value;
        newState.isError = false;
        this.setState(newState)
    }

    closeForm = () => {
        this.setState({isSuccess: true})
    }

    submitForm = () => {
        axios.post('http://localhost:8080/users/login', this.state.user)
            .then(response => {
                this.alert({type: 'success', msg: response.data.success})
                sessionStorage.setItem('token', response.data.token)
                this.setState({
                    isSuccess: true
                })
            })
            .catch(error => {
                this.alert({type: 'error', msg: error.response.data.error})
            })
    }

    alert = (alert) => {
        this.setState({
            showAlert: true,
            alert: alert
        }, () => {
            setTimeout(() => {
                this.setState({
                    showAlert: false,
                })
            }, 2000)
        })
    }

    render() {
        if (this.state.isSuccess) return <Redirect to={{pathname:'/home', state: this.state.alert}} />
        return (
            <div className='Login'>
                <div className='Login__Container'>
                    <img className='Login__Close-Icon' onClick={this.closeForm} src={closeIcon} alt="" />
                    <h1 className='Login__Title'>Login</h1>
                    <form className='Login__Form'>
                        <InputField 
                            name='email'
                            label='Email'
                            type='email'
                            extraClasses=''
                            value={this.state['email']}
                            placeholder='Please Enter Your Email'
                            onChangeHandler={this.onChangeHandler}/>
                        <InputField 
                            name='password'
                            label='Password'
                            type='password'
                            extraClasses=''
                            value={this.state['password']}
                            placeholder='Please Enter Your Password'
                            onChangeHandler={this.onChangeHandler}/>
                        <Button
                            type={'button'}
                            label={'Login'}
                            onClickHandler={this.submitForm}
                            extraClasses='Button--Login'/>
                    </form>
                </div>
                <Alert show={this.state.showAlert} alert={this.state.alert} />
            </div>
        );
    }
}