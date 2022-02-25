import Item from "./Item";

export default function List(props) {
  // { cat, n, name, amt }

  return (
    <ul className="List" id={props.id + "-list"}>
      {!props.list
        ? null
        : props.list
            .sort((a, b) => (a.cat > b.cat ? 1 : -1))
            .map((item, i) => <Item item={item} key={i} />)}
    </ul>
  );
}
