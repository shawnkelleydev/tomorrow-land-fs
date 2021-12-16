/*

New.js recieves props from List.js and builds list items.  It passes necessary
information to Data.js and Input.js, including important className data for
Input.js, which will distinguish it from other utilizations of the same component.

*/

import Input from "./Input";
import Data from "./Data";

const New = (props) => {
  return (
    <li id={props.id} className="item">
      <Data
        name={props.name}
        amt={props.amt}
        del={props.del}
        edit={props.edit}
      />
      <Input class="edit" submit={props.submit} />
      {/* input hidden */}
    </li>
  );
};

export default New;
