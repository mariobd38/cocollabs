const Burger = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
    return (
      <button
        onClick={toggle}
        className={`relative w-10 h-10 flex items-center justify-center group ${
          isOpen ? 'z-50 fixed ' : ''  // Make burger stay on top when open
        }`}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {/* Middle Line (Hidden When Open) */}
        <div
          className={`absolute w-6 h-[2px] bg-black rounded transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></div>
  
        {/* Top Line */}
        <div
          className={`absolute w-6 h-[2px] bg-black rounded transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
        ></div>
  
        {/* Bottom Line */}
        <div
          className={`absolute w-6 h-[2px] bg-black rounded transition-all duration-300 ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
        ></div>
      </button>
    );
};

export { Burger };