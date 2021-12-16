import Errors from "./Errors";

const SignInForm = (props) => {
  const errors = props.errors;
  return (
    <div className="signin--div">
      <p className="signin--p">Welcome! Please signin to get started.</p>
      {errors ? <Errors errors={errors} /> : null}
      <form className="signin--form" onSubmit={props.signin}>
        <label htmlFor="email" className="signin--label">
          email
        </label>
        <input type="email" id="email" name="email" className="signin--input" />
        <label htmlFor="password" className="signin--label">
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="signin--input"
        />
        <button type="submit" className="signin--submit">
          sign in
        </button>
      </form>
      <p className="signup--link" onClick={props.switch}>
        Need to sign up? Click here!
      </p>
    </div>
  );
};

export default SignInForm;
