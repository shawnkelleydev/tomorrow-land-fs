import { useEffect, useRef } from "react";

export default function Edit(props) {
  const nameInput = useRef(null);
  const amtInput = useRef(null);

  useEffect(() => {
    if (props.class === "edit" && props.target === "name") {
      nameInput.current.focus();
    } else if (props.class === "edit" && props.target === "amt") {
      amtInput.current.focus();
    }
  }, [props.class, props.target]);

  return (
    <form
      className={`${props.class} edit li--parent`}
      onSubmit={(e) => {
        //handler in App.js
        props.submit(e);
        props.switch(e);
      }}
      onBlur={(e) => {
        props.blur(e);
      }}
    >
      <input
        type="text"
        id="text-input"
        className="input--name"
        defaultValue={props.name}
        ref={nameInput}
      />

      <input
        id="amt-input"
        type="number"
        className="input--number"
        defaultValue={props.amt}
        ref={amtInput}
      />
      <button type="submit" className="submit">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="plus"
          className="svg-inline--fa fa-plus plus"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
          ></path>
        </svg>
      </button>
    </form>
  );
}
