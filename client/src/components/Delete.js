export default function Delete(props) {
  return (
    <button data={props.id} onClick={props.delete}>
      X
    </button>
  );
}
