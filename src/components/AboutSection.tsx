import React from 'react';

const AboutSection = () => {
  return (
    <div className="w-full px-4 md:px-24 py-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 bg-gray-100/50 rounded-2xl p-8">
          <img
            src="/otglogoWebsite.png"
            alt="About"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-black dark:text-black text-lg mb-8">
          Welcome to OTG! We are dedicated to bringing you the best hemp products and NFT experiences.
          Join us on this exciting journey as we launch our premium product line and NFT collection.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default AboutSection;