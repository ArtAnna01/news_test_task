import React from "react";
import { Provider } from "react-redux";
import Posts from "../store/posts";

function MainPage() {
  return (
    <Provider store={store}>
      <Posts />
    </Provider>
  );
}

export default MainPage;
