/*

Input is used for initial submissions and editing. Forms
are distinguished by className, which is passed in via this.props.

*/

import React, { Component } from "react";

class Input extends Component {
  state = {
    name: "",
    amt: "",
  };

  componentDidMount() {
    const id = this.props.id;
    const li = document.querySelector(`#${id}`);
    if (li) {
      let name = li.querySelector(".name");
      let amt = li.querySelector(".amt");
      name = name.innerText;
      amt = amt.innerText;
      this.setState({ name, amt });
    }
  }

  //  automatically calculates tithe from income data
  //  fired in outgo input controlled component functions below
  checkTithe() {
    const input = this.state.name;
    if (input.toLowerCase().includes("tith")) {
      const income = this.props.totalIncome;
      const amt = (income * 0.1).toFixed(0);
      this.setState({ amt });
    } else {
      return;
    }
  }

  render() {
    return (
      <form
        className={`${this.props.class} li--parent`}
        category={this.props.category}
        onSubmit={(e) => {
          this.props.submit(e);
          if (this.props.type === "edit") {
            this.props.switch();
            let name = e.target.querySelector(".input--name").value;
            let amt = e.target.querySelector(".input--number").value;
            this.setState({ name, amt });
          } else if (this.props.type === "initial") {
            this.setState({ name: "", amt: "" });
          }
        }}
      >
        <input
          type="text"
          id="text-input"
          className="input--name"
          value={this.state.name}
          onChange={(e) => {
            this.setState({ name: e.target.value });
            if (this.props.class === "outgo") {
              this.checkTithe();
            }
          }}
          placeholder={this.props.type === "initial" ? "name" : null}
          // defaultValue={this.props.type === "edit" ? name : null}
        />

        <input
          id="amt-input"
          type="number"
          className="input--number"
          value={this.state.amt}
          onChange={(e) => this.setState({ amt: e.target.value })}
          placeholder={this.props.type === "initial" ? "amount" : null}
        />
        <button type="submit" className="submit">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="plus"
            className="svg-inline--fa fa-plus plus"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
            ></path>
          </svg>
        </button>
      </form>
    );
  }
}

export default Input;
