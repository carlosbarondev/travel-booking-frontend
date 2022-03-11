import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./store/store";
import { AppRouter } from "./routers/AppRouter";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;