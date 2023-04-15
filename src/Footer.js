const Footer = () => {
  return ( 
    <footer className="container footer">
      <p>Based on the application from <em> <a href="https://www.youtube.com/@NetNinja"> The Net Ninja </a> </em>'s React tutorial </p>
      <p>Further functionality:</p>
      <ul className="footer-list">
        <li>Date of the blog release added to the blog object</li>
        <li>Filtering of the blogs by author's name</li>
        <li>'New' blog batch</li>
      </ul>
    </footer>
  );
}
 
export default Footer;