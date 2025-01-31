import { useEffect, useState } from "react";

export const useResponsive = (
  desktopBreakpoint = 1280,
  tabletBreakpoint = 768
) => {
  //Consts To Store The Current BreakPoint
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const handleResize = () => {
    //When Is Desktop Size (Desktop)
    if (window.innerWidth >= desktopBreakpoint) {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    }
    //When Is Medium Size (Tablet)
    else if (window.innerWidth >= tabletBreakpoint) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
    }
    //When Is Mobile Size (Mobile)
    else {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    }
  };

  useEffect(() => {
    // Call handleResize when window resizes
    window.addEventListener("resize", handleResize);

    // Call handleResize when loading component to set initial value
    handleResize();

    // Clear event listener when unmounting component
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    //Properties
    isMobile,
    isTablet,
    isDesktop,
  };
};
