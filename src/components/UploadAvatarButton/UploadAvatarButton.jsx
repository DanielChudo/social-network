import React from 'react';
import { useSelector } from 'react-redux';
import './UploadAvatarButton.css';

function UploadAvatarButton({ uploadAvatar }) {
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
        onChange={(e) => {
          if (e.target.files.length) {
            uploadAvatar(e.target.files[0]);
          }
        }}
      />
    </>
  );
}

export default UploadAvatarButton;
