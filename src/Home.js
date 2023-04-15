import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { data: blogs, isLoading, error } = useFetch("http://localhost:8000/blogs");

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(null);

  // console.log("Filter author:", filterAuthor)

  const handleClick = (e) => {
    setFilterVisible(!filterVisible);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredBlogs = blogs.filter(blog => {
      if (filterAuthor === '') {
        return true
      }
      return blog.author.includes(filterAuthor) 
    })

    setFilteredBlogs(filteredBlogs)
  }

  return (
    <div className="home">
      <div className="filter">
        <p>
          <span className="filter-text">Filter</span>
          <button 
            className="btn filter-visible-btn" 
            type="button"
            onClick={handleClick}>{filterVisible ? '^' : 'v'}</button>
        </p>
        {filterVisible && 
        <div className="filter-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="filter-form-author">Author:</label>
            <input type="text" value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)}/>
            <button className="btn filter-btn">Filter blogs</button>
          </form>
        </div>
        }
      </div>
      {error && <p>{error}</p>}
      {isLoading && <p>Data are being loaded...</p>}
      {blogs && <BlogList blogs={filteredBlogs ? filteredBlogs : blogs} title="All blogs" />}
    </div>
  );
};

export default Home;
