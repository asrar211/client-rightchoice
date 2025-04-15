import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart"; 

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const { cart } = useCart(); 

  const uniqueProductCount = cart?.items ? new Set(cart.items.map(item => item.productId)).size : 0;

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header>
      {!isLoggedIn && (
        <div className="bg-black py-2">
          <Link to="/signup">
            <p className="text-white font-light text-sm text-center underline cursor-pointer">
              Sign Up Now
            </p>
          </Link>
        </div>
      )}

      <div className="flex justify-between items-center py-4 px-3 shadow-xl md:px-10 lg:px-20">
        <div className="flex items-center gap-4 md:gap-8">
          <div
            className="flex flex-col gap-1 cursor-pointer md:hidden"
            aria-label="Menu"
            onClick={toggleMenu}
          >
            <span className="w-6 h-[3px] bg-black"></span>
            <span className="w-6 h-[3px] bg-black"></span>
            <span className="w-6 h-[3px] bg-black"></span>
          </div>

          <Link to="/">
            <h1 className="text-xl font-bold tracking-widest">RC</h1>
          </Link>
        </div>

        <div className="flex items-center gap-5 md:gap-8 text-xl md:text-2xl relative">
          {/* Cart Icon with Badge for Unique Product Count */}
          <Link to="/cart" className="relative">
            <span className="cursor-pointer" aria-label="Cart">🛒</span>
            {uniqueProductCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {uniqueProductCount}
              </span>
            )}
          </Link>

          <Link to="/profile">
            <span className="cursor-pointer" aria-label="Profile">👨🏻</span>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-6">
          <ul className="space-y-4 text-lg">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link></li>
            {!isLoggedIn && <li><Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link></li>}
          </ul>
        </div>
      )}
    </header>
  );
};
