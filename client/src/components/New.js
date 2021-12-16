/*

New.js recieves props from List.js and builds list items.  It passes necessary
information to Data.js and Input.js, including important className data for
Input.js, which will distinguish it from other utilizations of the same component.

*/

import React, { useState } from "react";

import Input from "./Input";
import Data from "./Data";

const New = (props) => {
  const [edit, setEdit] = useState(false);

  function switchEdit() {
    setEdit(!edit);
  }

  return (
    <li id={props.id} className="item">
      <Data
        class={edit ? "hide" : "data"}
        name={props.name}
        amt={props.amt}
        del={props.del}
        switch={switchEdit}
      />
      <Input
        class={edit ? "edit" : "hide"}
        submit={props.edit}
        type="edit"
        switch={switchEdit}
        id={props.id}
      />
      {/* input hidden */}
    </li>
  );
};

export default New;
