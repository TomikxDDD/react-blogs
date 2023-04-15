import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
  const blogsToRender = blogs.map((blog) => {
    return (
      <div className="blog-preview" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          <h3 className="blog-title">{blog.title}</h3>
          <p>Written by {blog.author}</p>
        </Link>
      </div>
    );
  });

  return (
    <div className="blog-list">
      <h2>{title}</h2>
      <div>{blogsToRender}</div>
    </div>
  );
};

export default BlogList;
