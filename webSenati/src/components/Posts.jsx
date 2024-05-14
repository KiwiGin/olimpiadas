import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Post from "./Post";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["contenidos", userId], // Specify the query key as an array
    queryFn: () =>
      makeRequest.get("/contenidos").then((res) => res.data), // Specify the function to fetch posts
  });

  console.log(data);

  return (
    <div className="posts">
      {/* {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)} */}
    </div>
  );
};

export default Posts;
