import { useEffect, useState } from "react";

export default function Balance(props) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (props.list.length > 0) {
      let income;
      let outgo;
      income = props.list
        .filter((item) => item.cat === 1)
        .reduce((tot, item) => tot + item.amt, 0);
      outgo = props.list
        .filter((item) => item.cat !== 1)
        .reduce((tot, item) => tot + item.amt, 0);
      setBalance(income - outgo);
    } else {
      setBalance(0);
    }
  }, [props]);

  return (
    <div className="Balance">
      <h2>balance</h2>
      <h2
        className={parseInt(balance) < 0 ? "red" : balance > 0 ? "lime" : null}
      >
        {balance}
      </h2>
    </div>
  );
}
