import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel CSS
import axios from "../../services/axios";
import { Link } from 'react-router-dom';

export const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const visibleProducts = products.slice(0, 4);

  return (
    <div className="w-full">
      <div className="w-full h-5 bg-gradient-to-b from-gray-100 to-white"></div>

      <h1 className="grot text-xl text-center mb-10">NEW ARRIVALS</h1>

      <Carousel
        showArrows={false}
        showIndicators={false}
        centerMode={true}
        infiniteLoop={true}
        emulateTouch={true}
        dynamicHeight={false}
        showThumbs={false}
        centerSlidePercentage={70}
        className="relative"
      >
        {visibleProducts.map((product) => (
          <div key={product.id} className="flex px-5">
            <div className="w-full h-full">
              <img
                className="object-cover shadow-2xl object-center rounded-xl h-60 transition-all duration-500 ease-in-out"
                src={product.image}
                alt={product.name}
              />
              <div className="flex flex-col justify-start items-start ml-2">
                <h3 className="grot text-[1rem] mt-1">{product.name}</h3>
                <p className="text-bold grot text-xl">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="mt-6">
        <Link to='/shop'>
        <button className="border border-black/50 cursor-pointer rounded-full w-[80%] ml-[10%] py-3 grot">
          View All
        </button></Link>
      </div>
    </div>
  );
};
