import { useMatch } from "react-router-dom";

const ErrorPage = () => {
  const matcherr = useMatch("/error/:err");
  const errorMsg = matcherr?.params.err;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>~ {errorMsg}.</i>
      </p>
    </div>
  );
};

export default ErrorPage;