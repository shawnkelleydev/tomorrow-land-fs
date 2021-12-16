/*

List is responsible for tranforming current income and outgo
state in App.js into html on the page.  It receives all
necessary data via props passed from App.js and passes that data
as needed to child components.

*/

import New from "./New.js";

const List = (props) => {
  let list = props.list;
  //alphabetize
  list = list.sort((a, b) => {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
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
            key={i}
            del={props.del}
            edit={props.edit}
            submit={props.submit}
          />
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default List;
