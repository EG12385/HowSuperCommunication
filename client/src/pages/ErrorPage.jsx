import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    return (
  <section className="error-page">
    <div className="center">
    <Link to ="/" className="btn primary">Home</Link>
    <h2>Page Not Found</h2>
    <iframe src="https://giphy.com/embed/3oEduTObiUMV3vD69y" width="480" height="480"  class="giphy-embed" allowFullScreen></iframe>
   

    </div>
  

  </section>
    )
}

export default ErrorPage;