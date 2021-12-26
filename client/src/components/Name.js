export default function Name(props) {
  return (
    <span
      onClick={() => {
        props.setIsEditing(true);
      }}
      className={props.isEditing ? "hide" : "name-span"}
    >
      {props.name}
    </span>
  );
}
