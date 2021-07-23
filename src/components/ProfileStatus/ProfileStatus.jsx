/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import './ProfileStatus.css';

function ProfileStatus(props) {
  const { status: propsStatus, isOwner } = props;

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(propsStatus);

  useEffect(() => {
    setStatus(propsStatus);
  }, [propsStatus]);

  const updateStatus = (e) => {
    props.updateStatus(status);
    // без этого onBlur инпута не сработает
    e.target[1].focus();
    e.preventDefault();
  };

  return (
    <div style={{ position: 'relative' }}>
      <p
        onClick={() => setEditMode(true)}
        style={{
          borderBottom: '3px dashed var(--main)',
          display: propsStatus || isOwner ? 'inline-block' : 'none',
        }}
      >
        {propsStatus || 'Напишите себе статус'}
      </p>
      {editMode && isOwner && (
        <form
          id="profile__status-change"
          className="wrapper"
          onSubmit={updateStatus}
        >
          <input
            autoFocus="true"
            type="text"
            value={status}
            placeholder="Напишите себе статус"
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => setEditMode(false)}
            onFocus={(e) => e.target.select()}
          />
          <button
            type="submit"
            // onBlur не позволяет onClick сработать нормально
            onMouseDown={(e) => e.preventDefault()}
          >
            Сохранить
          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileStatus;
