const Header = (props) => {
  if (props.user.id) {
    return (
      <header className="App-header">
        <h1>Tomorrow Land</h1>
        <p className="welcome">Welcome back, {props.user.firstName}!</p>
        <p className="signout" onClick={props.signout}>
          sign out
        </p>
      </header>
    );
  } else {
    return (
      <header className="App-header">
        <h1>Tomorrow Land</h1>
      </header>
    );
  }
};

export default Header;
