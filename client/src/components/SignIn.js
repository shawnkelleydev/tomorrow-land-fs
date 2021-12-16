import React, { Component } from "react";

class SignIn extends Component {
  state = {
    signUp: false,
  };

  switchSignUp() {
    this.setState({ signUp: !this.state.signUp });
  }

  render() {
    if (this.state.signUp === false) {
      return (
        <div className="signin--div">
          <p className="signin--p">Welcome! Please signin to get started.</p>
          <form className="signin--form" onSubmit={this.props.signin}>
            <label htmlFor="email" className="signin--label">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="signin--input"
            />
            <label htmlFor="password" className="signin--label">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="signin--input"
            />
            <button type="submit" className="signin--submit">
              sign in
            </button>
          </form>
          <p className="signup--link" onClick={() => this.switchSignUp()}>
            Need to sign up? Click here!
          </p>
        </div>
      );
    } else {
      return (
        <div className="signin--div">
          <p className="signin--p">Welcome! Please sign up to get started.</p>
          <form className="signin--form" onSubmit={this.props.signup}>
            <label htmlFor="firstName" className="signin--label">
              first name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="signin--input"
            />
            <label htmlFor="lastName" className="signin--label">
              last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="signin--input"
            />
            <label htmlFor="email" className="signin--label">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="signin--input"
            />
            <label htmlFor="password" className="signin--label">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="signin--input"
            />
            <button type="submit" className="signin--submit">
              sign up
            </button>
          </form>
          <p className="signup--link" onClick={() => this.switchSignUp()}>
            Already a user? Click here!
          </p>
        </div>
      );
    }
  }
}

export default SignIn;
