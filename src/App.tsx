import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Camera, Shield } from 'lucide-react';
import Home from './pages/Home';
import Demo from './pages/Demo';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <Camera className="w-8 h-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">LitterCam</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  Home
                </Link>
                <Link
                  to="/demo"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Try Demo
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">LitterCam</span>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-12">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold mb-2">Contact</h3>
                  <p className="text-gray-400">Email: info@littercam.com</p>
                  <p className="text-gray-400">Phone: (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                    <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                    <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2024 LitterCam. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;