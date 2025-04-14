import { Link } from "react-router-dom";
export const Hero = () => {
    return (
        <div className="bg-gray-100 py-8 px-5 md:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="md:text-left md:max-w-2xl">
                    <h1 className="pt-5 grot text-[2rem] ml-5 font-bold leading-[2.7rem] md:ml-0 md:text-[3.2rem] md:leading-[3.4rem]">
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>
                    <p className="text-[13.5px] mx-5 mt-1 font-light opacity-70 leading-[1.1rem] md:mx-0 md:text-base md:leading-[1.5rem] md:mt-3">
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>
                    <Link to='/shop'>
                    <button className="cursor-pointer font-light bg-black w-[80%] ml-[10%] mt-5 rounded-full text-white py-2.5 md:w-[200px] md:ml-0">
                        Shop Now
                    </button></Link>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-5 mt-5 md:flex-row md:justify-center md:items-start md:gap-10">
                    <div className="text-center">
                        <h2 className="font-bold text-2xl">200+</h2>
                        <p className="text-[14px] opacity-70 font-light">International Brands</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-2xl">2000+</h2>
                        <p className="text-[14px] opacity-70 font-light">High-Quality Products</p>
                    </div>
                    <div className="text-center">
                        <h2 className="font-bold text-2xl">20,000+</h2>
                        <p className="text-[14px] opacity-70 font-light">Happy Customers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
