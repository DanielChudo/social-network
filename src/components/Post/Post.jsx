import React from 'react';
import PropTypes from 'prop-types';
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

Post.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Post;
