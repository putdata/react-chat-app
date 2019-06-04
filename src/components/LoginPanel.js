import React, { Component } from 'react'
import axios from 'axios';
import './css/LoginPanel.css';

class LoginPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visSignIn: true,
      reqID: '',
      reqPW: '',
      reqRePW: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
    this.viewSignIn = this.viewSignIn.bind(this)
    this.viewSignUp = this.viewSignUp.bind(this)
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSignIn(e) {
      e.preventDefault()

      axios
      .post('/user/login', {
        userID: this.state.reqID,
        userPW: this.state.reqPW
      })
      .then(res => {
        if(res.data === this.state.reqID) {
          this.props.onSuccess(res.data);
        } else {
          this.setState({reqID: '', reqPW: ''});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  onSignUp(e) {
      e.preventDefault()

      axios
      .post('/user/regist', {
        userID: this.state.reqID,
        userPW: this.state.reqPW,
        userRePW: this.state.reqRePW
      })
      .then(res => {
        console.log(res);
        if(res.data === 'success') {
          this.viewSignIn();
        } else {
          this.setState({reqID: '', reqPW: '', reqRePW: ''});
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  viewSignIn() {
    this.setState({visSignIn: true, reqID: '', reqPW: ''})
  }

  viewSignUp() {
    this.setState({visSignIn: false, reqID: '', reqPW: '', reqRePW: ''})
  }

  render() {
    const SIGNIN = (
      <div>
        <form onSubmit={ this.onSignIn }>
          <input type="text" name="reqID" value={ this.state.reqID } onChange={ this.onChange } required autoFocus/>
          <input type="password" name="reqPW" value={ this.state.reqPW } onChange={ this.onChange } required/>
          <button type="submit">SIGN IN</button>
        </form>
      </div>
    )

    const SIGNUP = (
      <div>
        <form onSubmit={ this.onSignUp }>
          <input type="text" name="reqID" value={ this.state.reqID } onChange={ this.onChange } required autoFocus/>
          <input type="password" name="reqPW" value={ this.state.reqPW } onChange={ this.onChange } required/>
          <input type="password" name="reqRePW" value={ this.state.reqRePW } onChange={ this.onChange } required/>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    )

    return (
      <div className="sign-container">
        <div>
          <div onClick={ this.viewSignIn }>SIGN IN</div>
          <div onClick={ this.viewSignUp }>SIGN UP</div>
        </div>
        { this.state.visSignIn ? SIGNIN : SIGNUP }
      </div>
    )
  }
}

export default LoginPanel;