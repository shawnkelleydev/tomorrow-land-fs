//dependencies
import React, { useState, useRef, useEffect } from "react";

//components
import EditName from "./EditName";
import EditAmount from "./EditAmount";
import Delete from "./Delete";
import Name from "./Name";
import Amount from "./Amount";

const New = (props) => {
  //state
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  //refs
  const nameInput = useRef(null);
  const amountInput = useRef(null);

  //focus handling
  useEffect(() => {
    if (isEditingName) {
      nameInput.current.focus();
    } else if (isEditingAmount) {
      amountInput.current.focus();
    }
  }, [isEditingName, isEditingAmount]);

  //blur handling
  const blur = (component) => {
    if (component === "name") {
      setIsEditingName(false);
    } else if (component === "amount") {
      setIsEditingAmount(false);
    }
  };

  return (
    <li id={props.id} className="item">
      <ul className="grid">
        <li className="name">
          <Name
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            name={props.name}
            nameRef={nameInput}
          />
          <EditName
            submit={props.edit}
            isEditing={isEditingName}
            setIsEditing={setIsEditingName}
            blur={blur}
            nameRef={nameInput}
            id={props.id}
            prevValue={props.name}
          />
        </li>
        <li className="amount">
          <Amount
            isEditing={isEditingAmount}
            setIsEditing={setIsEditingAmount}
            amount={props.amt}
            amountRef={amountInput}
          />
          <EditAmount
            submit={props.edit}
            isEditing={isEditingAmount}
            setIsEditing={setIsEditingAmount}
            blur={blur}
            amountRef={amountInput}
            id={props.id}
            prevValue={props.amt}
          />
        </li>
        <li className="delete">
          <Delete id={props.id} delete={props.delete} />
        </li>
      </ul>
    </li>
  );
};

export default New;
