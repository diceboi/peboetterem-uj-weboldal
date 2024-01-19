"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const FacebookPixelEvents: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        const facebookPixelId = process.env.FACEBOOK_PIXEL_ID;

        if (facebookPixelId) {
          ReactPixel.init(facebookPixelId);
          ReactPixel.pageView();
        } else {
          console.error("Facebook Pixel ID is not defined.");
        }
      });
  }, [pathname, searchParams]);

  return null;
};