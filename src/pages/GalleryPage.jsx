import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css'; // Import styles for the lightbox
import { FaUserAlt } from 'react-icons/fa'; // Icon for user's name in the overlay

// Importing images
import image1 from '../assets/1714827910980.jpeg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';
import image5 from '../assets/5.jpg';
import image6 from '../assets/6.jpg';
import image7 from '../assets/7.jpg';
import image8 from '../assets/8.jpg';
import image9 from '../assets/9.jpg';
import image10 from '../assets/10.jpg';
import image11 from '../assets/11.jpg';
import image12 from '../assets/12.jpg';
import backgroundImage from '../assets/gallery.jpg';

const GalleryPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null); // To track the clicked image
  const images = [
    { src: image1, userName: 'John Doe', description: 'Delicious food dish 1' },
    { src: image2, userName: 'Jane Smith', description: 'Appetizing dessert 2' },
    { src: image3, userName: 'Alice Cooper', description: 'Refreshing drink 3' },
    { src: image4, userName: 'Bob Marley', description: 'Healthy salad 4' },
    { src: image5, userName: 'Charlie Brown', description: 'Yummy pizza 5' },
    { src: image6, userName: 'David Lee', description: 'Spicy Fish Soup' },
    { src: image7, userName: 'Eve White', description: 'Crispy Fried Chicken' },
    { src: image8, userName: 'Frank Black', description: 'Red Sauce Pasta' },
    { src: image9, userName: 'Grace Green', description: 'The Best Fruit Salad' },
    { src: image10, userName: 'Henry Adams', description: 'Tuna Sushi Rolls' },
    { src: image11, userName: 'Ivy Brown', description: 'Chocolate Cake' },
    { src: image12, userName: 'Jack White', description: 'Chocolate And Vanilla Ice Cream' },
  ];

  // Handle the opening of the lightbox on image click
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="gallery-page">
      {/* Page Title Section */}
      <div
        className="page-title text-center py-12 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="text-4xl font-bold bg-black bg-opacity-50 inline-block px-4 py-2 rounded">
          Gallery
        </h1>
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
              className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer"
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
