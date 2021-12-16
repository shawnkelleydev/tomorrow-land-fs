/*

Data produces the text for the items the user adds
to Tomorrow Land.

*/

const Data = (props) => {
  return (
    <span className={props.class}>
      <span
        className="name"
        onClick={() => {
          props.switch();
        }}
      >
        {props.name}
      </span>
      <span
        className="amt"
        onClick={() => {
          props.switch();
        }}
      >
        {props.amt}
      </span>
      <button className="del-btn" onClick={props.del}>
        X
      </button>
    </span>
  );
};

export default Data;
