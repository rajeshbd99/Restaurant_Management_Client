import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import styles for the lightbox
import { FaUserAlt } from 'react-icons/fa'; // Icon for user's name in the overlay

const GalleryPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null); // To track the clicked image
  const images = [
    { src: '/images/image1.jpg', userName: 'John Doe', description: 'Delicious food dish 1' },
    { src: '/images/image2.jpg', userName: 'Jane Smith', description: 'Appetizing dessert 2' },
    { src: '/images/image3.jpg', userName: 'Alice Cooper', description: 'Refreshing drink 3' },
    { src: '/images/image4.jpg', userName: 'Bob Marley', description: 'Healthy salad 4' },
    { src: '/images/image5.jpg', userName: 'Charlie Brown', description: 'Yummy pizza 5' },
    { src: '/images/image6.jpg', userName: 'David Lee', description: 'Spicy soup 6' },
    { src: '/images/image7.jpg', userName: 'Eve White', description: 'Fried chicken 7' },
    { src: '/images/image8.jpg', userName: 'Frank Black', description: 'Pasta 8' },
    { src: '/images/image9.jpg', userName: 'Grace Green', description: 'Fruit salad 9' },
    { src: '/images/image10.jpg', userName: 'Henry Adams', description: 'Sushi rolls 10' }
  ];

  // Handle the opening of the lightbox on image click
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="gallery-page">
      {/* Page Title Section */}
      <div className="page-title text-center py-12 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold">Gallery</h1>
      </div>

      {/* Gallery Section */}
      <div className="gallery-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group"
            onClick={() => openLightbox(index)} // Open lightbox on image click
          >
            <img
              src={image.src}
              alt={`Food Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white text-center">
              <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                <FaUserAlt className="inline-block text-xl mb-2" />
                <h3 className="text-lg font-semibold">{image.userName}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox for showing clicked images */}
      {currentImageIndex !== null && (
        <Lightbox
          open={true}
          index={currentImageIndex}
          close={() => setCurrentImageIndex(null)} // Close the lightbox when clicked
          slides={images.map((image) => ({ src: image.src }))}
        />
      )}
    </div>
  );
};

export default GalleryPage;
