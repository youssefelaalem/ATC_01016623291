import React from "react";

const Footer = () => {
  return (
    <footer className=" mx-auto px-4 py-10 bg-[#184297] text-white mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            Empowering event creators through every stage of the journey – sell
            tickets, promote events, engage sponsors, and discover events.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-blue-300">
                My Tickets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Discover Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Virtual Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300">
                Create Events
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: support@events.com</p>
          <p className="text-sm">Phone: +1-800-555-1234</p>
          <p className="text-sm">Address: 123 Event St, Event City, EC 12345</p>
        </div>

        <div className="w-[90%]">
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-2">
            Subscribe to our newsletter for the latest events!</p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-blue-700 text-center text-sm">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-blue-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-blue-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-blue-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-blue-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p>© 2025 events.com. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
