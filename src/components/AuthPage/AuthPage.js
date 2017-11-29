import React, { Component } from "react";
import "./AuthPage.css";
import { setToken } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AuthPage extends Component {
  state = {
    token: ""
  };
  handleOnChange = e => {
    this.setState({ token: e.target.value });
  };
  handleOnKeyDown = e => {
    if (e.keyCode === 13) {
      this.props.setToken(this.state.token);
    }
  };
  render() {
    return (
      <div className="auth">
        <div className="auth__description">
          <p>
            Получить токен нужно на своей странице github, перейдите по{" "}
            <a href="https://github.com/settings/tokens">адресу</a> и создать
            себе токен. Запишите куда нибудь токен, так как после создания
            доступ к нему будет только один раз.
          </p>
        </div>
        <div className="auth__input">
          <input
            type="text"
            placeholder="auth_token"
            value={this.state.token}
            onChange={this.handleOnChange}
            onKeyDown={this.handleOnKeyDown}
          />
        </div>
        <div className="auth__description">
          <span>После вводва нажать Enter</span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setToken
};

export default connect(null, mapDispatchToProps)(AuthPage);
