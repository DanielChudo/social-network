import React from 'react';
import { useSelector } from 'react-redux';
import './UploadAvatarButton.css';

function UploadAvatarButton(props) {
  const uploadAvatar = (e) => {
    if (e.target.files.length) {
      props.uploadAvatar(e.target.files[0]);
    }
  };

  const uploadAvatarPercent = useSelector(
    (state) => state.profilePage.uploadAvatarPercent
  );

  return (
    <>
      <label id="uploadAvatar__input" htmlFor="uploadAvatar__button">
        {uploadAvatarPercent ? `${uploadAvatarPercent}%` : 'Обновить аватарку'}
      </label>
      <input
        type="file"
        id="uploadAvatar__button"
        disabled={uploadAvatarPercent}
        onChange={uploadAvatar}
      />
    </>
  );
}

export default UploadAvatarButton;
