import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar should be full-width but content aligned */}
            <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-5">
                    <Header />
                </div>
            </div>

            {/* Main Content with proper padding to account for fixed navbar */}
            <main className="flex-1 mt-16 max-w-7xl mx-auto px-5 py-6">
                <Outlet />
            </main>

            {/* Footer should be full-width but content aligned */}
            <div className="w-full bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-5">
                    <Footer />
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Layout;
