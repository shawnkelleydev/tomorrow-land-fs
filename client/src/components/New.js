//dependencies
import React, { useState } from "react";

//components
import Data from "./Data";
import Edit from "./Edit";

const New = (props) => {
  //edit mode state
  const [edit, setEdit] = useState(false);

  //toggle edit
  function switchEdit(e) {
    setEdit(!edit);
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
        type="edit"
        switch={switchEdit}
        id={props.id}
        name={props.name}
        amt={props.amt}
      />
      {/* input hidden */}
    </li>
  );
};

export default New;
