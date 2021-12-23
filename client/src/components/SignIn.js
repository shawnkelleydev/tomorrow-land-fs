import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Loading from "./Loading";

const SignIn = (props) => {
  if (props.serverStatus === 200) {
    if (props.signedUp) {
      return (
        <SignInForm
          signin={props.signin}
          switch={props.switch}
          errors={props.errors}
        />
      );
    } else {
      return (
        <SignUpForm
          signup={props.signup}
          switch={props.switch}
          errors={props.errors}
        />
      );
    }
  } else {
    return <Loading />;
  }
};

export default SignIn;
