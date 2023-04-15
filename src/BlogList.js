import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const BlogList = ({ blogs, title }) => {
  
  const [noBlogsToRender, setNoBlogsToRender] = useState(false);

  const currentDate = new Date();

  useEffect(() => {
    if (blogs){
      blogs.length === 0 ? setNoBlogsToRender(true) : setNoBlogsToRender(false) 
    }
  }, [blogs])
  
  const blogsToRender = blogs.map((blog) => {

    const isNew = (currentDate.getDate() === parseInt(blog.date.day)) && 
                  (currentDate.getMonth() + 1 === parseInt(blog.date.month)) &&
                  (currentDate.getFullYear() === parseInt(blog.date.year));
                  
    return (
      <div className="blog-preview" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          <h3 className="blog-title">{blog.title} <span className="blog-new-batch">{isNew && '(new)'}</span></h3>
          <p>Written by {blog.author} on <span className="text-blue">{blog.date.day}/{blog.date.month}/{blog.date.year}</span></p>
        </Link>
      </div>
    );
  });

  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {noBlogsToRender && <p>There are no blogs to render </p>}
      <div>{blogsToRender}</div>
    </div>
  );
};

export default BlogList;
