import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './src/components/Header/Header';
import Footer from './src/components/Footer/Footer';
import Home from './src/pages/Home/Home';
import Foods from './src/pages/AllFoods';
import Gallery from './src/pages/GalleryPage';
import Login from './src/pages/Login/Login';
import Register from './src/pages/Register/Register';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-base-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foods" element={<Foods />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
