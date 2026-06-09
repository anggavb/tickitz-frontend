import { useState } from 'react';
import { ProfileEditContext } from './profileEditContext';

export function ProfileEditProvider({ children }) {
  const [showEditModal, setShowEditModal] = useState(false);
  return <ProfileEditContext.Provider value={{ showEditModal, setShowEditModal }}>{children}</ProfileEditContext.Provider>;
}
