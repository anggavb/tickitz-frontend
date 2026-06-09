import { createContext, useContext } from 'react';

export const ProfileEditContext = createContext();

export function useProfileEdit() {
  return useContext(ProfileEditContext);
}
