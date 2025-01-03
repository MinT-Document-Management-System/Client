import React from 'react';

const About = () => {
  return (
    <div className="about-container p-6 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="mb-6">Welcome to our document management system. This platform helps you organize, manage, and store your documents efficiently.</p>
      
      <section className="mission-section mb-6">
        <h2 className="text-3xl font-semibold mb-2">Our Mission</h2>
        <p>Our mission is to provide a seamless and secure document management experience for individuals and businesses.</p>
      </section>
      
      <section className="features-section mb-6">
        <h2 className="text-3xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">Easy document upload and organization</li>
          <li className="mb-2">Secure storage with encryption</li>
          <li className="mb-2">Access your documents from anywhere</li>
        </ul>
      </section>
      
      <section className="contact-section mb-6">
        <h2 className="text-3xl font-semibold mb-2">Contact Us</h2>
        <p>If you have any questions or need support, feel free to reach out to our support team.</p>
      </section>
      
      <footer className="footer mt-4 p-4 bg-gray-200 text-center">
        <p>&copy; ©2025 MInT. Document Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;