import React from 'react';
import './Post.css';

function Post({ title, text }) {
  return (
    <div className="post wrapper">
      <p>
        <strong>{title}</strong>
        <br />
        <br />
        {text}
      </p>
      <p className="date">20.10.2020</p>
    </div>
  );
}

export default Post;
