import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Post from "./Post";
import Spinner from "../assets/Spinne.svg";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["contenidos", userId], 
    queryFn: () =>
      makeRequest.get("/contenidos/getPosts", { params: { userId } }).then((res) => res.data), 
  });

  console.log(data);


  return (
    <div className="flex flex-col gap-5">
      {error
        ? "Something went wrong!"
        : isLoading
        ? <img src={Spinner} alt="Loading..." />
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
