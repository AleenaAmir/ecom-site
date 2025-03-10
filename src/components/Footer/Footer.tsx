const Footer = () => {
    return (
      <footer className="bg-white border-t border-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section - Logo & Address */}
          <div>
            <h2 className="text-2xl font-bold">Funiro.</h2>
            <p className="text-gray-600 mt-3">
           Lahore - Pakistan
            </p>
          </div>
  
          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">Shop</li>
              <li className="hover:text-black cursor-pointer">About</li>
              <li className="hover:text-black cursor-pointer">Contact</li>
            </ul>
          </div>
  
          {/* Help Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Help</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">Payment Options</li>
              <li className="hover:text-black cursor-pointer">Returns</li>
              <li className="hover:text-black cursor-pointer">Privacy Policies</li>
            </ul>
          </div>
  
          {/* Newsletter Subscription */}
          <div>
                    <i className="fa-solid fa-envelope-open-text text-2xl text-gray-600 mb-3"></i>
                    <i className="fa-solid fa-paper-plane text-2xl text-gray-600 mb-3"></i>
           
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="mt-8 text-center text-gray-600 text-sm border-t pt-4">
          © 2023 Funiro. All rights reserved
        </div>
      </footer>
    );
  };
  
  export default Footer;
  