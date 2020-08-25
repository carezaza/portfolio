import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import axios from "axios";

import store from "../redux/store";
import { setUser } from "../redux/user/slice";

axios
  .get("/api/user/currentUser")
  .then((res) => store.dispatch(setUser(res.data)))
  .catch((err) => console.error(err.message));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        theme={{
          colors: {
            primary: "#0070f3",
            secondary: "#ff3267",
          },
        }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
