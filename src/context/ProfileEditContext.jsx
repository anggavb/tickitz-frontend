import { useState } from 'react';
import { ProfileEditContext } from './profileEditContext';

export function ProfileEditProvider({ children }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  return (
    <ProfileEditContext.Provider
      value={{ showEditModal, setShowEditModal, isEditing, setIsEditing, selectedPhoto, setSelectedPhoto, previewPhoto, setPreviewPhoto }}
    >
      {children}
    </ProfileEditContext.Provider>
  );
}
