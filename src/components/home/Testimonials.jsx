import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Great service and amazing products!",
    author: "Lala"
  },
  {
    quote: "I love shopping here, highly recommend!",
    author: "Asrar"
  },
  {
    quote: "Fast shipping and excellent customer support. Fast shipping and excellent customer support.",
    author: "Salman"
  }
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-12">
      <h2 className="text-2xl grot font-bold mx-5 mt-5">Our Happy <br /> Customers</h2>
      <div className="flex justify-center">
        <div className="relative w-full max-w-md h-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute border-[1px] shadow-2xl shadow-blue-300 border-blue-300 rounded-lg py-10 px-5 mt-5 w-[90%] ml-[5%]"
            >
              <p className="font-bold">{testimonials[index].author}.</p>
              <p className="opacity-70 text-sm my-2">"{testimonials[index].quote}"</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
