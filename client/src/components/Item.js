import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Item(props) {
  // { cat, n, name, amt }

  const [id, setId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setId(props.item.n);
  }, [props]);

  function del() {
    let t = searchParams.get("t");
    t = t
      .split("_")
      .filter((item) => parseInt(item.split("-")[1]) !== id)
      .filter((item) => item !== "");
    t =
      t.length > 0
        ? t.map((item) => (item += "_")).reduce((str, item) => str + item)
        : "";
    setSearchParams(`t=${t}`);
  }

  return (
    <li className={`Item cat-${props.item.cat}`}>
      <span>{props.item.name}</span>
      <div>
        <span>{props.item.amt}</span>
        <button onClick={() => del()}>x</button>
      </div>
    </li>
  );
}
