/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProfileStatus.css';

function ProfileStatus({ status: propsStatus, isOwner, updateStatus }) {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(propsStatus);

  useEffect(() => {
    setStatus(propsStatus);
  }, [propsStatus]);

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
      {isOwner && editMode && (
        <form
          id="profile__status-change"
          className="wrapper"
          onSubmit={(e) => {
            updateStatus(status);
            // без этого onBlur инпута не сработает
            e.target[1].focus();
            e.preventDefault();
          }}
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

ProfileStatus.propTypes = {
  status: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  updateStatus: PropTypes.func.isRequired,
};

export default ProfileStatus;
