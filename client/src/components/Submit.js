import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Submit(props) {
  // controls -- conditionally set based on props for reusability as an editing tool
  const [text, setText] = useState(props.name ? props.name : "");
  const [amt, setAmt] = useState(props.amt ? props.amt.toString() : "");
  const [cat, setCat] = useState(props.cat ? props.cat.toString() : "1");
  const [warning, setWarning] = useState(false);

  const inputRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  function add(e) {
    e.preventDefault();
    // cat-n-name-amt
    let str = `${cat}-${Date.now()}-${text}-${amt}_`;
    let t = !searchParams.get("t") ? "" : searchParams.get("t");
    str = t + str;
    if (text.match(/[a-zA-Z0-9]/g) && amt.match(/[0-9]/g)) {
      setSearchParams(`t=${str}`);
      setText("");
      setAmt("");
      setWarning(false);
      inputRef.current.focus();
    } else {
      setWarning(true);
    }
  }

  function edit(e) {
    e.preventDefault();
    let stamp = props.stamp;
    let t = searchParams.get("t");
    if (t && t.match(/[a-zA-Z0-9]/g)) {
      t = t
        .split("_")
        .filter((str) => !str.includes(stamp))
        .filter((item) => item !== "")
        .map((item) => item + "_");
      t = t.length > 0 ? t.reduce((str, item) => str + item) : null;
    } else {
      t = null;
    }
    let str = `${cat}-${stamp}-${text}-${amt}_`;
    str = t ? str + t : str;
    if (text.match(/[a-zA-Z0-9]/g) && amt.match(/[0-9]/g)) {
      setSearchParams(`t=${str}`);
      props.setEditing(false);
      setWarning(false);
    } else {
      setWarning(true);
    }
  }

  const cats = [
    "income",
    "giving",
    "debt",
    "taxes",
    "insurance",
    "saving",
    "investing",
    "utilities",
    "food",
    "transportation",
    "miscellaneous",
  ];

  const inputs = [
    { id: "name", type: "text" },
    { id: "amount", type: "number" },
  ];

  return (
    // presence of props.stamp tells form whether to run add or edit for component reusability
    <form onSubmit={(e) => (props.stamp ? edit(e) : add(e))} className="Submit">
      {inputs.map((item, i) => (
        <label key={i} htmlFor={item.id}>
          {item.id}
          <input
            type={item.type}
            ref={i === 0 ? inputRef : null}
            id={item.id}
            value={item.id === "name" ? text : amt}
            onChange={(e) =>
              item.id === "name"
                ? setText(e.target.value)
                : setAmt(e.target.value)
            }
          />
        </label>
      ))}
      <label htmlFor="category">
        <select
          id="category"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          {cats.map((cat, i) => (
            <option key={i} value={i + 1}>
              {cat}
            </option>
          ))}
        </select>
        category
      </label>
      <button type="submit">submit</button>
      {warning ? <legend>Please check your input.</legend> : null}
    </form>
  );
}
