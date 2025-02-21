import * as React from "react"

const MOBILE_BREAKPOINT = 768;
const MOBILE_BREAKPOINT_ACTIVE_SIDEBAR = 1080;

export function useIsMobile(openSidebarToggle) {
  
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    // console.log(window.innerWidth);
    // const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // const onChange = () => {
    //   setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // }
    // mql.addEventListener("change", onChange)
    // setIsMobile(window.innerWidth < MOBILE_BREAKPOINT || (openSidebarToggle && window.innerWidth < MOBILE_BREAKPOINT_ACTIVE_SIDEBAR))
    // return () => mql.removeEventListener("change", onChange);
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

  const onChange = () => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT || 
                (openSidebarToggle && window.innerWidth < MOBILE_BREAKPOINT_ACTIVE_SIDEBAR));
  };

  // Set the initial state
  onChange();

  // Add both resize and matchMedia listeners
  mql.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);

  return () => {
    mql.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
  }, [openSidebarToggle])

  return !!isMobile
}
