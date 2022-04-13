import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const params = useParams();
  return <div className="container">BlogPost {params.id}</div>;
}

export default BlogPost;
