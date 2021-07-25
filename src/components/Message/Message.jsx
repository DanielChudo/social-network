import React from 'react';
import defaultAvatar from '../../images/defaultAvatar.png';
import './Message.css';

function Message(props) {
  const { text } = props;

  return (
    <div className="message">
      <img className="message__avatar" src={defaultAvatar} alt="user avatar" />
      <div>
        <span className="message__author">Чудновский Даниэль</span>
        <span className="message__date">00:18</span>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
