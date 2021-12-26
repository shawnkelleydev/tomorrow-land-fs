export default function EditAmount(props) {
  return (
    <form
      className={props.isEditing ? "js-edit-amount" : "hide"}
      onSubmit={(e) => {
        props.submit(e);
        props.setIsEditing(false);
      }}
      onBlur={() => props.blur("amount")}
      data={props.id}
    >
      <input
        id="amt-input"
        type="number"
        className="input--number"
        defaultValue={props.prevValue}
        ref={props.amountRef}
      />
    </form>
  );
}
