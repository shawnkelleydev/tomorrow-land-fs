// for basic input fields (editing fields in Edit.js)

import { useState } from "react";

export default function Input(props) {
  //controlls
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <form
      className={`${props.class} li--parent`}
      onSubmit={(e) => {
        //handler in App.js
        props.submit(e);
        //reset name / amount fields
        setName("");
        setAmount("");
        //refocus on name field
        e.target.querySelector(".input--name").focus();
      }}
    >
      <input
        type="text"
        id="text-input"
        className="input--name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder={props.type === "initial" ? "name" : ""}
      />

      <input
        id="amt-input"
        type="number"
        className="input--number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
        placeholder={props.type === "initial" ? "amount" : ""}
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
