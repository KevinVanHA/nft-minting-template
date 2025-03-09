import React from 'react';

const AboutSection = () => {
  return (
    <div id="about" className="w-full px-4 md:px-24 py-16 bg"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(/aboutbg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 bg-gray-100/50 rounded-2xl p-8">
          <img
            src="/otglogoWebsite.png"
            alt="About"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-white dark:text-white text-lg mb-8">
          Welcome to OTG! We are dedicated to bringing you the best hemp products and NFT experiences.
          Join us on this exciting journey as we launch our premium product line and NFT collection.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AboutSection;