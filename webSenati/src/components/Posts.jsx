import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import Post from "./Post";
import Spinner from "../assets/Spinne.svg";

const Posts = ({ userId }) => {
  console.log("userId: "+userId);
  const { isLoading, error, data } = useQuery({
    queryKey: ["contenidos", userId], 
    queryFn: async () =>
      await makeRequest.get("/contenidos/get/", {params: {userId: userId}}).then((res) => res.data), 
  });

  console.log({data, isLoading, error});


  return (
    <div className="flex flex-col gap-5">
      {error
        ? "Something went wrong!"
        : isLoading
        ? <img src={Spinner} alt="Loading..." />
        : data?.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
