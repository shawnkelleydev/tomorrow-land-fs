import List from "./List";

export default function Display(props) {
  return (
    <div className="Display">
      <h2>{props.id}</h2>
      <List id={props.id} list={props.list} />
    </div>
  );
}
