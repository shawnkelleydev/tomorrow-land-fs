export default function EditName(props) {
  return (
    <form
      className={props.isEditing ? "js-edit-name" : "hide"}
      onSubmit={(e) => {
        props.submit(e);
        props.setIsEditing(false);
      }}
      onBlur={() => props.blur("name")}
      data={props.id}
    >
      <input
        type="text"
        id="text-input"
        className="input--name"
        defaultValue={props.prevValue}
        ref={props.nameRef}
      />
    </form>
  );
}
