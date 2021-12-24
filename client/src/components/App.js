import { useState, useEffect } from "react";
import axios from "axios";

//components
import Header from "./Header";
import List from "./List";
import Input from "./Input";
import SignIn from "./SignIn";

//global api url references

//live server

const baseUrl = "https://tomorrowland-skd.herokuapp.com/api";

//dev server

// const baseUrl = "http://localhost:8080/api";

//routes
const entryUrl = baseUrl + "/entry";
const userUrl = baseUrl + "/users";

export default function App() {
  // GLOBAL STATE via hooks
  const [entries, setEntries] = useState([]);
  const [totalIncome, setTotalIncome] = useState(null);
  const [balance, setBalance] = useState("0");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState(null);
  const [signedUp, setSignedUp] = useState(true);
  const [serverStatus, setServerStatus] = useState(null);

  /* ===================

    GET CREDS
  
  =================== */

  //wake up heroku dyno
  useEffect(() => {
    pokeAPI();
  }, []);

  //heroku poker
  function pokeAPI() {
    axios
      .get(baseUrl)
      .then((res) => {
        res.status === 200 ? setServerStatus(200) : setServerStatus(500);
      })
      .catch((err) => console.error("Mand down! ", err));
  }

  //get user on status change if user data in local storage
  useEffect(() => {
    if (serverStatus === 200) {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      if (username && password) {
        const auth = {
          username,
          password,
        };
        getUser(auth);
      }
      //poke it again
    } else if (serverStatus === 500) {
      setTimeout(pokeAPI, 1000);
    }
  }, [serverStatus]);

  function getUser(auth) {
    setPassword(auth.password);
    axios
      .get(userUrl, { auth })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);

          setErrors(null);
        }
      })
      .catch((err) => {
        console.error("Invalid credentials. ", err);
        setPassword(null);
        setUser(null);
      });
  }

  // GET ENTRIES ON USER CHANGE
  useEffect(() => {
    if (user) {
      const url = entryUrl;
      const auth = {
        username: user.emailAddress,
        password,
      };
      axios
        .get(url, { auth })
        .then((res) => {
          const entries = res.data.entry;
          setEntries(entries);
        })
        .catch((err) => console.error("getData  man down! ", err));
    }
  }, [user, password]);

  // UPDATE BALANCE
  useEffect(() => {
    let income = entries.filter((entry) => entry.isIncome);
    let outgo = entries.filter((entry) => !entry.isIncome);
    //get total income
    const inArr = [];
    income.forEach((entry) => inArr.push(parseInt(entry.amount)));
    income = inArr.reduce((total, entry) => total + entry, 0);
    setTotalIncome(income);
    //get total outgo
    const outArr = [];
    outgo.forEach((entry) => outArr.push(parseInt(entry.amount)));
    outgo = outArr.reduce((total, entry) => total + entry, 0);
    //get balance
    const balance = income - outgo;
    setBalance(balance);
    //change color
    const bal = document.querySelector(".bal");
    if (bal) {
      if (balance < 0) {
        bal.className = "bal negative";
      } else if (balance > 0) {
        bal.className = "bal positive";
      } else {
        bal.className = "bal";
      }
    }
  }, [entries]);

  /* ===================

    USER AUTHENTICATION

  =================== */

  function signUp(e) {
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
      .then((x) => {
        axios.get(url, { auth }).then((res) => {
          setUser(res.data.user);
          setPassword(password);
          setErrors(null);
        });
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  }

  function signIn(e) {
    e.preventDefault();
    const url = userUrl;
    const username = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const auth = {
      username,
      password,
    };

    setPassword(password);
    axios
      .get(url, { auth })
      .then((res) => {
        const authUser = res.data.user;
        setUser(authUser);
        setErrors(null);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      })
      .catch((err) => {
        console.error(err);
        setErrors([err.response.data.message]);
      });
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    setPassword(null);
    setEntries([]);
  }

  /* ================
  
    ITEM SUBMISSIONS
  
  ================= */

  function handleSubmit(e) {
    e.preventDefault();
    //---------------------------
    let focusTarget = e.target[0];
    let item = e.target[0].value;
    let amt = e.target[1].value;
    let key = (Math.random() * 1000000).toFixed(0);
    //---------------------------
    //return on empty input
    if (item === "" || amt === "") {
      return;
      //income---------------------
    } else if (e.target.className.includes("income")) {
      addNewItem(item, amt, key, "in");
      focusTarget.focus();
      //outgo---------------------
    } else if (e.target.className.includes("outgo")) {
      addNewItem(item, amt, key, "out");
      focusTarget.focus();
    }
  }

  function addNewItem(item, amt, key, code) {
    const prev = entries;
    key = code + key;
    let isIncome = true;
    if (code === "out") {
      isIncome = false;
    }
    //set state
    setEntries([...prev, { name: item, amount: amt, key, isIncome }]);

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
      username: user.emailAddress,
      password: password,
    };
    //post
    axios.post(url, body, { auth });
  }

  /* ========
  
    DELETE
  
  ======== */

  async function handleDelete(e) {
    const key = e.target.parentElement.parentElement.id;
    deleteFromDB(key);
    deleteFromState(key);
  }

  function deleteFromDB(key) {
    const url = entryUrl;
    const data = { key };
    const auth = {
      username: user.emailAddress,
      password: password,
    };
    axios.delete(url, { data, auth });
  }

  function deleteFromState(key) {
    const updated = entries.filter((entry) => entry.key !== key);
    setEntries(updated);
  }

  /* =========
  
    EDITING
  
  ========= */

  /*
  
  NOTE - conditional rendering of edit fields handled in New.js

  */

  function handleEdit(e) {
    e.preventDefault();

    //select all the things
    const li = e.target.parentElement;
    const key = li.id;
    //form
    const form = li.querySelector("form");
    const nField = form.querySelector("#text-input");
    const aField = form.querySelector("#amt-input");
    //values
    const name = nField.value;
    let amt = aField.value;
    amt = parseInt(amt);
    if (!name || !amt) {
      return;
    } else {
      let currentEntries = entries;
      let entry = currentEntries.filter((entry) => entry.key === key)[0];
      entry.name = name;
      entry.amount = amt;
      //erase old
      currentEntries = currentEntries.filter((entry) => entry.key !== key);
      //add new
      setEntries([...currentEntries, entry]);
      //edit db
      const url = entryUrl;

      const body = {
        key,
        name,
        amount: amt,
      };
      //current user
      const auth = {
        username: user.emailAddress,
        password: password,
      };

      axios.put(url, body, { auth }).catch((err) => console.error(err));
    }
  }

  //swith sign in / sign up
  const switchSignUp = () => {
    setSignedUp(!signedUp);
    setErrors(null);
  };

  /* ==========
  
    RENDERINGS

  ========== */

  if (user) {
    return (
      <div className="App">
        <Header user={user} signout={() => signOut()} />
        <div className="list-div">
          {/* <List /> assembles LI based on user input */}
          <List
            list={entries}
            del={(e) => handleDelete(e)}
            edit={(e) => handleEdit(e)}
            submit={(e) => handleSubmit(e)}
            isIncome={true}
          />
          <Input
            class="income"
            submit={(e) => handleSubmit(e)}
            type="initial"
          />
          {/* input is available to App.js and New.js for forthcoming editing features */}
        </div>
        <div className="mid">
          {/* Balance will update based on user input */}
          <h2>income</h2>
          <div className="bal-div">
            <h2>Balance</h2>
            <h2 className="bal">$ {balance}</h2>
          </div>
          <h2>outgo</h2>
        </div>
        <div className="list-div">
          {/* input is available to App.js and New.js for forthcoming editing features */}
          <Input
            class="outgo"
            submit={(e) => handleSubmit(e)}
            type="initial"
            totalIncome={totalIncome}
          />
          <List
            list={entries}
            del={(e) => handleDelete(e)}
            edit={(e) => handleEdit(e)}
            submit={(e) => handleSubmit(e)}
            isIncome={false}
          />
          {/* <List /> assembles LI based on user input */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header user={user} />
        <SignIn
          signedUp={signedUp}
          signin={(e) => signIn(e)}
          signup={(e) => signUp(e)}
          errors={errors}
          switch={switchSignUp}
          serverStatus={serverStatus}
        />
      </div>
    );
  }
}
