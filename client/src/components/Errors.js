const Errors = (props) => {
  const errors = props.errors;

  return (
    <div className="validation--div">
      <h2>Man down!</h2>
      <ul>
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default Errors;
