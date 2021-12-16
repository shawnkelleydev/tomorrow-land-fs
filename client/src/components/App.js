import React from "react";
import axios from "axios";

//components
import Header from "./Header";
import List from "./List";
import Input from "./Input";
import SignIn from "./SignIn";

const entryUrl = "http://localhost:8080/api/entry";
const userUrl = "http://localhost:8080/api/users";

class App extends React.Component {
  /*
  
  State is managed here in App.

  */

  state = {
    entries: [],
    income: [],
    outgo: [],
    balance: "0",
    inItem: "",
    inAmt: "",
    outItem: "",
    outAmt: "",
    user: {},
    password: "",
    errors: null,
    signedUp: true,
  };

  /* ===================

    GET CREDS
  
  =================== */

  componentDidMount() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
      const url = userUrl;
      const auth = {
        username,
        password,
      };
      this.setState({ password });
      axios
        .get(url, { auth })
        .then((res) => {
          this.setState({ user: res.data.user, errors: null });
        })
        .then((x) => {
          const url = entryUrl;
          const auth = {
            username: this.state.user.emailAddress,
            password: this.state.password,
          };
          axios
            .get(url, { auth })
            .then((res) => {
              const entries = res.data.entry;
              this.setState({ entries });
            })
            .then((e) => this.updateBalance());
        })
        .catch((err) =>
          console.error("Invalid credentials in local storage. ", err)
        );
    }
  }

  /* ===================

    USER AUTHENTICATION

  =================== */

  signUp(e) {
    e.preventDefault();
    const url = userUrl;
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const emailAddress = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const body = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    const auth = {
      username: emailAddress,
      password,
    };
    axios
      .post(url, body)
      .then((res) => {
        axios
          .get(url, { auth })
          .then((res) =>
            this.setState({ user: res.data.user, password, errors: null })
          );
      })
      .catch((err) => {
        this.setState({ errors: err.response.data.errors });
      });
  }

  signIn(e) {
    e.preventDefault();
    const url = userUrl;
    const username = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const auth = {
      username,
      password,
    };

    this.setState({ password });
    axios
      .get(url, { auth })
      .then((res) => {
        this.setState({ user: res.data.user, errors: null });
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        this.updateBalance();
      })
      .then((x) => {
        const url = entryUrl;
        const auth = {
          username: this.state.user.emailAddress,
          password: this.state.password,
        };
        axios
          .get(url, { auth })
          .then((res) => {
            const entries = res.data.entry;
            this.setState({ entries });
          })
          .then((e) => this.updateBalance());
      })
      .catch((err) => this.setState({ errors: [err.response.data.message] }));
  }

  signOut() {
    localStorage.clear();
    this.setState({ user: {}, password: "" });
  }

  /* ======
  
    SUBMIT
  
  ======= */

  handleSubmit(e) {
    e.preventDefault();
    //---------------------------
    let focusTarget = e.target[0];
    let item = e.target[0].value;
    let amt = e.target[1].value;
    let key = (Math.random() * 1000000).toFixed(0);
    // const prevIncome = this.state.income;
    // const prevOutgo = this.state.outgo;
    //---------------------------
    //return on empty input
    if (item === "" || amt === "") {
      return;
      //income---------------------
    } else if (e.target.className.includes("income")) {
      this.addNewItem(item, amt, key, "in");
      focusTarget.focus();
      //outgo---------------------
    } else if (e.target.className.includes("outgo")) {
      this.addNewItem(item, amt, key, "out");
      focusTarget.focus();
      //edit---------------------
    } else if (e.target.className.includes("edit")) {
      //insert edit callbacks here
    }
  }

  async addNewItem(item, amt, key, code) {
    const prev = this.state.entries;
    key = code + key;
    let isIncome = true;
    if (code === "out") {
      isIncome = false;
    }
    //controlled component maintenance
    if (isIncome) {
      this.setState({ inItem: "", inAmt: "" });
    } else {
      this.setState({ outItem: "", outAmt: "" });
    }
    let entries = [...prev, { name: item, amount: amt, key, isIncome }];
    //set state
    await this.setState({
      entries,
    });

    this.updateBalance();

    //send to db
    const url = entryUrl;
    //UserId added in express middleware
    const body = {
      key,
      name: item,
      amount: amt,
    };
    //current user
    const auth = {
      username: this.state.user.emailAddress,
      password: this.state.password,
    };
    //post
    axios.post(url, body, { auth });
  }

  /* ========
  
    DELETE
  
  ======== */

  /* 
  
  

  */

  async handleDelete(e) {
    const key = e.target.parentElement.parentElement.id;
    this.deleteFromDB(key);
    await this.deleteFromState(key);
    this.updateBalance();
  }

  deleteFromDB(key) {
    const url = entryUrl;
    const data = { key };
    const auth = {
      username: this.state.user.emailAddress,
      password: this.state.password,
    };
    axios.delete(url, { data, auth });
  }

  deleteFromState(key) {
    const updated = this.state.entries.filter((entry) => entry.key !== key);
    this.setState({ entries: updated });
  }

  /* ================

    BALANCE UPDATES

  ================ */

  /* 
  
  updateBalance() is called whenever a change occurs.
  
  */

  async updateBalance() {
    let income = this.state.entries.filter((entry) => entry.isIncome);
    let outgo = this.state.entries.filter((entry) => !entry.isIncome);
    //get total income
    const inArr = [];
    income.forEach((entry) => inArr.push(parseInt(entry.amount)));
    income = inArr.reduce((total, entry) => total + entry, 0);
    //get total outgo
    const outArr = [];
    outgo.forEach((entry) => outArr.push(parseInt(entry.amount)));
    outgo = outArr.reduce((total, entry) => total + entry, 0);
    //get balance
    const balance = income - outgo;
    this.setState({ balance });
    //change color
    const bal = document.querySelector(".bal");
    if (balance < 0) {
      bal.className = "bal negative";
    } else if (balance > 0) {
      bal.className = "bal positive";
    } else {
      bal.className = "bal";
    }
  }

  //  automatically calculates tithe from income data
  //  fired in outgo input controlled component functions below
  checkTithe() {
    const input = this.state.outItem;

    if (input.toLowerCase().includes("tith")) {
      let income = this.state.entries.filter((entry) => entry.isIncome);
      const inArr = [];
      income.forEach((entry) => inArr.push(parseInt(entry.amount)));
      income = inArr.reduce((total, entry) => total + entry, 0);
      const tithe = income * 0.1;
      this.setState({ outAmt: tithe });
    } else {
      return;
    }
  }

  /* ===============
  
    INPUT CHANGE 
  
  =============== */

  /*
  
  Due to input fields' native state behavior, React must be
  given control of and manage values.  The functions below
  contribute to a "controlled component", or the code which
  overrides input native state behavior. 
  
  */

  handleIncomeInputChange(e) {
    if (e.target.type === "text") {
      this.setState({ inItem: e.target.value });
    } else {
      this.setState({ inAmt: e.target.value });
    }
  }

  handleOutgoInputChange(e) {
    if (e.target.type === "text") {
      this.setState({ outItem: e.target.value });
      this.checkTithe();
    } else {
      this.setState({ outAmt: e.target.value });
    }
  }

  /* =====
  
    EDIT
  
  ===== */

  /*
  
  handleEdit(e) uses event data to hide spans and show input fields with
  appropriate pre-set values.
  
  ! DISABLED !

  */

  handleEdit(e) {
    console.log(e);
    //seelct all the things
    // const key = e.target.parentElement.parentElement.id;
    // const li = document.getElementById(key);
    // const form = li.querySelector("form");
    // const labels = form.querySelectorAll("label");
    // const data = li.querySelector(".data");
    // const textInput = form.querySelector(".text");
    // const amtInput = form.querySelector(".number");
    // //hide / show
    // hide(data);
    // hideList(labels);
    // show(form);
    // //set preliminary input values
    // textInput.value = data.querySelector(".item").innerText;
    // amtInput.value = data.querySelector(".amt").innerText;
  }

  //swith sign in / sign up
  switchSignUp = () => {
    this.setState({ signedUp: !this.state.signedUp });
  };

  /* =======
  
    RENDER
  
  ======= */

  /*
  
  render() includes the parent jsx information needed to populate
  the page with html.  It passes data via props to child components,
  which are used to conduct all of the operations of the app.
  
  */

  render() {
    if (this.state.user.id) {
      return (
        <div className="App">
          <Header user={this.state.user} signout={() => this.signOut()} />
          <div className="list-div">
            {/* <List /> assembles LI based on user input */}
            <List
              list={this.state.entries}
              del={(e) => this.handleDelete(e)}
              edit={(e) => this.handleEdit(e)}
              submit={(e) => this.handleSubmit(e)}
              isIncome={true}
            />
            <Input
              class="income"
              submit={(e) => this.handleSubmit(e)}
              change={(e) => this.handleIncomeInputChange(e)}
              itemVal={this.state.inItem}
              amtVal={this.state.inAmt}
            />
            {/* input is available to App.js and New.js for forthcoming editing features */}
          </div>
          <div className="mid">
            {/* Balance will update based on user input */}
            <h2>income</h2>
            <div className="bal-div">
              <h2>Balance</h2>
              <h2 className="bal">$ {this.state.balance}</h2>
            </div>
            <h2>outgo</h2>
          </div>
          <div className="list-div">
            {/* input is available to App.js and New.js for forthcoming editing features */}
            <Input
              class="outgo"
              submit={(e) => this.handleSubmit(e)}
              change={(e) => this.handleOutgoInputChange(e)}
              itemVal={this.state.outItem}
              amtVal={this.state.outAmt}
            />
            <List
              list={this.state.entries}
              del={(e) => this.handleDelete(e)}
              edit={(e) => this.handleEdit(e)}
              submit={(e) => this.handleSubmit(e)}
              isIncome={false}
            />
            {/* <List /> assembles LI based on user input */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header user={this.state.user} />
          <SignIn
            signedUp={this.state.signedUp}
            signin={(e) => this.signIn(e)}
            signup={(e) => this.signUp(e)}
            errors={this.state.errors}
            switch={this.switchSignUp}
          />
        </div>
      );
    }
  }
}

/*

show and hide functions for use above

*/

// function hide(element) {
//   element.style.display = "none";
// }

// // function hideList(list) {
// //   list.forEach((element) => (element.style.display = "none"));
// // }

// function show(element) {
//   element.style.display = "flex";
// }

/* 

App is exported for use in index.js

*/

export default App;
