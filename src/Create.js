import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

const Create = () => {
  
  const [blogTitle, setBlogTitle] = useState('')
  const [blogBody, setBlogBody] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogDate, setBlogDate] = useState({})

  const [addingBlog, setAddingBlog] = useState(false)

  const history = useHistory();

  // Save the current date
  useEffect(() => {
    const currDate = new Date()

    const currDay = currDate.getDate() < 10 ? `0${currDate.getDate()}` : `${currDate.getDate()}`
    const currMonth = currDate.getMonth() + 1 < 10 ? `0${currDate.getMonth() + 1}` : `${currDate.getMonth() + 1}`
    
    setBlogDate({
      day: currDay,
      month: currMonth,
      year: currDate.getFullYear()
    })

  }, [addingBlog])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {title: blogTitle, author: blogAuthor,  body: blogBody, date: blogDate}

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
      setBlogAuthor('')
      setBlogDate({})

      history.push("/");
    }), 500)
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
          <option value="Alice">Alice</option> 
          <option value="Bob">Bob</option> 
          <option value="Chris">Chris</option> 
          <option value="David">David</option> 
        </select>
        {addingBlog ? <button className="btn create-btn" type="button" disabled>Saving the blog</button> : <button className="btn create-btn" type="submit">Add blog</button> }
      </form>
    </div>
  );
};

export default Create;
