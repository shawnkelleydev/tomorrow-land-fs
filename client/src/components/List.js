//dependencies
// import { useState } from "react";

//components
import New from "./New.js";

const List = (props) => {
  //editing state
  //list
  let list = props.list;

  // !! something about the sort seems to be causing bugs -- turned off for now

  //alphabetize
  // list = list.sort((a, b) => {
  //   let nameA = a.name.toLowerCase();
  //   let nameB = b.name.toLowerCase();
  //   return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  // });
  if (list) {
    //sort and return
    if (props.isIncome) {
      list = list.filter((entry) => entry.isIncome === true);
    } else {
      list = list.filter((entry) => entry.isIncome === false);
    }

    return (
      <ul>
        {list.map((entry, i) => (
          <New
            name={entry.name}
            amt={entry.amount}
            id={entry.key}
            // confusing with entry.key / key
            //entry.key refers to the entrie's unique, encoded id
            key={i}
            delete={props.delete}
            edit={props.edit}
            submit={props.submit}
            entries={props.entries}
          />
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default List;
