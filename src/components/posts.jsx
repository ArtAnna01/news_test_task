import { useDispatch, useSelector } from "react-redux";
import { loadposts } from "../store/posts";
import { useCallback, useEffect } from "react";
import { Cached } from "@mui/icons-material";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.list);

  const handleUpdate = useCallback(() => {
    dispatch(loadposts());
  }, [dispatch]);

  useEffect(() => {
    // setInterval(() => {
    //   handleUpdate();
    // }, 60000);
    handleUpdate();
  }, [handleUpdate]);

  console.log(posts);
  return (
    <div>
      <h1>
        Posts
        <button onClick={handleUpdate}>
          <Cached />
        </button>
      </h1>
      <ul>
        {posts.map((post) => {
          const time = new Date(post.time * 1000).toDateString();
          return (
            <>
              <p> {post.title} </p>
              <p>
                By: {post.by} {time}
              </p>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
