import { Component } from 'react';
import axios from 'axios'
import InputField from '../../Components/InputField/InputField'
import Button from '../../Components/Button/Button';
import './Signup.scss'
import closeIcon from '../../Assets/Icons/close_black_24dp.svg'
import { Redirect } from 'react-router-dom';

export default class Signup extends Component {
    state = {
        user: {
            name: '',
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
        axios.post('http://localhost:8080/users/signup', this.state.user)
            .then(response => {
                console.log(response)
                this.setState({isSuccess: true})
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
            <div className='Signup'>
                <div className='Signup__Container'>
                    <img className='Signup__Close-Icon' onClick={this.closeForm} src={closeIcon} alt="" />
                    <h1 className='Signup__Title'>Sign Up Today!</h1>
                    <form className='Signup__Form'>
                        <InputField 
                            name='name'
                            label='Full Name'
                            type='text'
                            extraClasses=''
                            value={this.state['name']}
                            placeholder='Please Enter Your Name'
                            onChangeHandler={this.onChangeHandler}/>
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
                            label={'Sign Up'}
                            onClickHandler={this.submitForm}
                            extraClasses='Button--Signup'/>                           
                    </form>
                    {this.state.isError && <p className='Signup__Error'>{this.state.errorMessage}</p>}
                </div>
            </div>
        );
    }
}
