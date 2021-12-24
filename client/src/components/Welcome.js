export default function Welcome(props) {
  return (
    <div className="Welcome">
      <h3 className="welcome-message">Welcome back, {props.user.firstName}!</h3>
    </div>
  );
}
