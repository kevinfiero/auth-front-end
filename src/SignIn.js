import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';

export default class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state);
        const user = await request
            .post('https://agile-thicket-76983.herokuapp.com/auth/signin')
            .send(this.state); 
        this.props.updateEmailAndToken(user.body.email, user.body.token)
        this.props.history.push('/todo');
    }

    render() {
        return (
            <div>
                <label>Sign in with an existing account:</label>
                <form className='column center' onSubmit = {this.handleSubmit}>
                    <div className = 'row small-margin'>
                        <label id='email-label'>Email:</label>
                        <input type='text' onChange={(e) => this.setState({ email: e.target.value })}></input>
                    </div>
                    <div className = 'row small-margin'>
                        <label id='password-label'>Password:</label>
                        <input type='password' onChange={(e) => this.setState({ password: e.target.value })}></input>
                    </div>
                    <button className='small-margin'>Sign In</button>
                </form>
                <div className='row center'>
                    <label className = 'small-font label-margin'>Don't have an account?</label>
                    <Link to="./signup">
                        <button className = 'small-font'>Sign Up</button>
                    </Link>
                    
                </div>
            </div>
        )
    }
}
