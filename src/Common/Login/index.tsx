import { connect } from "react-redux";
// import { setCounterAsync } from "../../Config/Store/Slices/appState";
import { useEffect } from "react";
// import { doPOST } from "../../Helpers/apiHelper";
// import APIConstants from "../../Constants/apiConstants";

const Login = (props: any) => {
  const { counter, setCounter } = props;

  useEffect(() => {
    // setCounter()
    // doPOST(APIConstants.sampleEndPoint, {});
  }, []);

  return <>Login Page : {counter}</>;
};

//HERE USE useSelector()-to get the data from redux state and useDispatch() - to call the action

const mapStateToProps = (state: any) => {
  const { appState } = state;
  return { counter: appState.counter };
};

const mapPropsToDispatch = (dispatch: any) => {
  return {
    // setCounter: () => dispatch(setCounterAsync()),
  };
};

export default connect(mapStateToProps, mapPropsToDispatch)(Login);
