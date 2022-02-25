import { useEffect, useState } from "react";

import "./css/App.css";
import Display from "./components/Display";
import Balance from "./components/Balance";
import Submit from "./components/Submit";
import { useSearchParams } from "react-router-dom";

export default function App() {
  // id_text_amt
  // id = tl+randomNumber-category-categoryNumber

  const [list, setList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let str = localStorage.getItem("t");
    if (str) {
      setSearchParams(`t=${str}`);
    }
  }, [setSearchParams]);

  useEffect(() => {
    let t = searchParams.get("t");
    localStorage.setItem("t", t);
    if (!t) {
      setList([]);
    } else {
      t = t.split("_").filter((item) => item !== "");
      let arr = [];
      t.forEach((str) => {
        let ob = str.split("-");
        ob = {
          cat: parseInt(ob[0]),
          n: parseInt(ob[1]),
          name: ob[2],
          amt: parseInt(ob[3]),
        };
        arr.push(ob);
      });
      setList(arr);
    }
    // { cat, n, name, amt }
  }, [searchParams]);

  return (
    <div className="App">
      <h1>Tomorrow Land</h1>
      <div>
        <div>
          <Submit />
          <Balance list={list} />
        </div>
        <Display
          id="income"
          list={list ? list.filter((ob) => ob.cat === 1) : null}
        />
        <Display
          id="outgo"
          list={list ? list.filter((ob) => ob.cat !== 1) : null}
        />
      </div>
    </div>
  );
}