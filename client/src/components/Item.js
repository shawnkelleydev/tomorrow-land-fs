import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Submit from "./Submit";

export default function Item(props) {
  // { cat, n, name, amt }

  const [id, setId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setId(props.item.n);
  }, [props]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (
        tag !== "input" &&
        tag !== "label" &&
        tag !== "form" &&
        tag !== "legend" &&
        tag !== "button" &&
        tag !== "select" &&
        tag !== "option" &&
        tag !== "span"
      ) {
        setEditing(false);
      }
    });
  }, []);

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
      {editing ? (
        <Submit
          stamp={id}
          name={props.item.name}
          amt={props.item.amt}
          cat={props.item.cat}
          setEditing={setEditing}
        />
      ) : (
        <>
          <span onClick={() => setEditing(true)}>{props.item.name}</span>
          <div>
            <span onClick={() => setEditing(true)}>{props.item.amt}</span>
            <button onClick={() => del()}>x</button>
          </div>
        </>
      )}
    </li>
  );
}
