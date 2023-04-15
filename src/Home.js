import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { data: blogs, isLoading, error } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isLoading && <p>Data are being loaded...</p>}
      {blogs && <BlogList blogs={blogs} title="All blogs" />}
    </div>
  );
};

export default Home;
