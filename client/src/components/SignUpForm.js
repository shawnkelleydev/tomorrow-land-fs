const SignUpForm = (props) => {
  const errors = props.errors;
  return (
    <div className="signin--div">
      <p className="signin--p">Welcome! Please sign up to get started.</p>
      {errors ? (
        <div className="validation--div">
          <h2>Error</h2>
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <form className="signin--form" onSubmit={props.signup}>
        <label htmlFor="firstName" className="signin--label">
          first name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="signin--input"
        />
        <label htmlFor="lastName" className="signin--label">
          last name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="signin--input"
        />
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
          sign up
        </button>
      </form>
      <p className="signup--link" onClick={props.switch}>
        Already a user? Click here!
      </p>
    </div>
  );
};

export default SignUpForm;
