import { useEffect } from "react";
import env from "@/utils/env";

export function getPageTitle(pageTitle) {
  const title = String(pageTitle ?? "").trim();

  return title ? `${env.appTitle} | ${title}` : env.appTitle;
}

export default function usePageTitle(pageTitle) {
  useEffect(() => {
    document.title = getPageTitle(pageTitle);
  }, [pageTitle]);
}
