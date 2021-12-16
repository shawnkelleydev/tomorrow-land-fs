import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const SignIn = (props) => {
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
};

export default SignIn;
