export default function Amount(props) {
  return (
    <span
      onClick={() => {
        props.setIsEditing(true);
        props.amountRef.current.focus();
      }}
      className={props.isEditing ? "hide" : "amount-span"}
    >
      {props.amount}
    </span>
  );
}
