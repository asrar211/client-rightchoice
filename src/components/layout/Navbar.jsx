import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header>
      {/* Top banner */}
      {!localStorage.getItem("token") ? (
        <div className="bg-black py-2">
        <Link to="/signup">
          <p className="text-white font-light text-sm text-center underline cursor-pointer">
            Sign Up Now
          </p>
        </Link>
      </div>
      ) : null}
      

      {/* Main Navbar */}
      <div className="flex justify-between items-center py-4 px-3 shadow-xl md:px-10 lg:px-20">
        {/* Left - Menu and Logo */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Hamburger Icon - only visible on small screens */}
          <div className="flex flex-col gap-1 cursor-pointer md:hidden" aria-label="Menu">
            <span className="w-6 h-[3px] bg-black"></span>
            <span className="w-6 h-[3px] bg-black"></span>
            <span className="w-6 h-[3px] bg-black"></span>
          </div>

          {/* Logo or Title */}
          <div>
            <h1 className="text-xl font-bold tracking-widest hidden md:block">Right Choice</h1>
          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-5 md:gap-8 text-xl md:text-2xl">
          {/* <span className="cursor-pointer" aria-label="Search">🔍</span> */}
          <span className="cursor-pointer" aria-label="Cart">🛒</span>
          <Link to='/profile'><span className="cursor-pointer" aria-label="Profile">👨🏻</span></Link>
        </div>
      </div>
    </header>
  );
};
