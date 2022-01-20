import { Component } from 'react';
import InputField from '../../Components/InputField/InputField'
import Button from '../../Components/Button/Button';
import './Signup.scss'

export default class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    onChangeHandler = (event) => {
        const { name, value} = event.target;
        const newState = {...this.state}
        newState[name] = value;
        this.setState(newState)
    }

    render() {
        return (
            <div className='Signup'>
                <div className='Signup__Container'>
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
                            onClickHandler={(event) => {event.preventDefault(); console.log('added')}}
                            extraClasses='Button--Bottom'/>
                    </form>
                </div>
            </div>
        );
    }
}
