import env from "./env";

export const DEFAULT_PROFILE_PHOTO = "/assets/default-profile.webp";

export function getProfilePhotoSrc(photo) {
  const value = typeof photo === "string" ? photo.trim() : "";

  if (!value) {
    return DEFAULT_PROFILE_PHOTO;
  }

  if (/^(blob:|data:|https?:\/\/)/i.test(value)) {
    return value;
  }

  if (value.startsWith("/assets/")) {
    return value;
  }

  if (value.startsWith("assets/")) {
    return `/${value}`;
  }

  const baseUrl = env.baseAPI.replace(/\/$/, "");
  const path = value.startsWith("/") ? value : `/${value}`;

  if (baseUrl && path.startsWith(`${baseUrl}/`)) {
    return path;
  }

  return `${baseUrl}${path}`;
}
