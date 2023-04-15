import { useState } from "react";
import { useHistory } from "react-router-dom"

const Create = () => {
  
  const [blogTitle, setBlogTitle] = useState('')
  const [blogBody, setBlogBody] = useState(null)
  const [blogAuthor, setBlogAuthor] = useState(null)

  const [addingBlog, setAddingBlog] = useState(false)

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = {title: blogTitle, author: blogAuthor,  body: blogBody}

    setAddingBlog(true)
    
    setTimeout(() => fetch('http://localhost:8000/blogs', {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(newBlog)
    })
    .then(() => {
      setAddingBlog(false)
      setBlogTitle('')
      setBlogBody('')
      setBlogAuthor('Tomas')

      history.push("/");
    }), 2500)
  }

  return (
    <div className="create">
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Blog title:</label>
        <input 
          type="text" 
          required 
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          />
        <label htmlFor="">Blog text:</label>
        <textarea
          required
          value={blogBody}
          onChange={(e) => setBlogBody(e.target.value)}
          ></textarea>
        <label htmlFor="">Blog author:</label>
          
        <select
          value={blogAuthor}
          onChange={(e) => setBlogAuthor(e.target.value)}>
          <option value="Tomas">Tomas</option> 
          <option value="Jakub">Jakub</option> 
          <option value="Alice">Alice</option> 
        </select>
        {addingBlog ? <button className="btn create-btn" type="button" disabled>Saving the blog</button> : <button className="btn create-btn" type="submit">Add blog</button> }
      </form>
    </div>
  );
};

export default Create;
