//dependencies
import React, { useState } from "react";

//components
import Data from "./Data";
import Edit from "./Edit";

const New = (props) => {
  //edit mode state
  const [edit, setEdit] = useState(false);
  const [target, setTarget] = useState(null);

  //toggle edit
  function switchEdit(e) {
    //name or amt
    setTarget(e.target.className);
    setEdit(!edit);
    props.setCurrentEditId(props.id);
  }

  function blur(e) {
    setEdit(false);
  }

  return (
    <li id={props.id} className="item">
      <Data
        class={edit ? "hide" : "data"}
        name={props.name}
        amt={props.amt}
        del={props.del}
        switch={(e) => switchEdit(e)}
      />
      <Edit
        class={edit ? "edit" : "hide"}
        submit={props.edit}
        switch={switchEdit}
        id={props.id}
        name={props.name}
        amt={props.amt}
        blur={blur}
        target={target}
      />
      {/* input hidden */}
    </li>
  );
};

export default New;
