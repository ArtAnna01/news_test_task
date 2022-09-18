import axios from "axios";
import * as actions from "./api";

const getStory = async (id) => {
  try {
    const story = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return story.data;
  } catch (error) {
    console.log("Error while getting a story.");
  }
};

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: `https://hacker-news.firebaseio.com/v0/newstories.json`,
        method,
        data,
      });

      const stories = await Promise.all(
        response.data.slice(0, 100).map(getStory)
      );

      // dispatch(actions.apiCallSucess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: stories });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
