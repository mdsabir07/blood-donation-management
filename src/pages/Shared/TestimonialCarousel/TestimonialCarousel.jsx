import { useState } from 'react';
import reviews from '../../../data/reviews';
import { FaStar, FaRegStar } from 'react-icons/fa';

const VISIBLE_CARDS = 3;

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 relative" data-aos="fade-up" data-aos-delay="500" data-aos-duration="3000">
      <h2 className="text-4xl font-bold text-center mb-6">What People Say</h2>

      <div className="relative py-8 px-5 md:px-10 overflow-hidden">
        <div className="flex transition-all duration-500 ease-in-out gap-4">
          {visibleReviews.map((review, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 shrink-0"
            >
              <div className="card bg-base-100 shadow-xl p-6 text-center transition-transform duration-300 hover:scale-105 h-full">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full ring-2 ring-primary mx-auto mb-4 object-cover"
                />
                <p className="italic mb-4">"{review.testimonial}"</p>
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < review.rating ? (
                      <FaStar key={i} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={i} className="text-yellow-400" />
                    )
                  )}
                </div>
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <p className="text-sm">{review.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2 px-2">
        <button onClick={prevSlide} className="btn btn-circle btn-primary text-white shadow-md">❮</button>
        <button onClick={nextSlide} className="btn btn-circle btn-primary text-white shadow-md">❯</button>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
