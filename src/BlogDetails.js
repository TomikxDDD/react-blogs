import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom"


const BlogDetails = () => {
  const { id } = useParams();

  const history = useHistory();

  const { data: blog, isLoading, error } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleClick = (e) => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: 'DELETE'
    })
    .then(
      history.push('/')
    )
  }

  return (
    <div className="blog-details">
      {isLoading && <div>Data are being loaded</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-author">Written by <span className="text-blue">{blog.author}</span></p>
          <p className="blog-date">posted on <span className="text-blue">{blog.date.day}/{blog.date.month}/{blog.date.year}</span></p>
          <p className="blog-body">{blog.body}</p>
          <button className="btn blog-btn-delete"onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
