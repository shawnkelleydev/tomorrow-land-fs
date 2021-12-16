/*

Data produces the text for the items the user adds
to Tomorrow Land.

*/

const Data = (props) => {
  return (
    <span className="data">
      <span className="name" onClick={props.edit}>
        {props.name}
      </span>
      <span className="amt" onClick={props.edit}>
        {props.amt}
      </span>
      <button className="del-btn" onClick={props.del}>
        X
      </button>
    </span>
  );
};

export default Data;
