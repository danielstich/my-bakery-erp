import { Component } from 'react';
import axios from 'axios'
import InputField from '../../Components/InputField/InputField'
import Button from '../../Components/Button/Button';
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
        isError: false,
        errorMessage: ''
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
                console.log(response)
                sessionStorage.setItem('token', response.data.token)
                this.setState({
                    isSuccess: true
                })
            })
            .catch(error => {
                console.log(error.response.data.error)
                this.setState({
                    isError: true,
                    errorMessage: error.response.data.error
                })
            })
    }

    render() {
        if (this.state.isSuccess) return <Redirect to={{pathname:'/', alert:''}} />
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
                    {this.state.isError && <p className='Signup__Error'>{this.state.errorMessage}</p>}
                </div>
            </div>
        );
    }
}