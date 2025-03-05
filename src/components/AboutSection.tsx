import React from 'react';

const AboutSection = () => {
  return (
    <div className="flex items-center m-12">
      <div className="w-1/2 pr-4">
        <img src="/otglogoWebsite.png" alt="About" className="rounded-lg" />
      </div>
      <div className="w-1/2">
        <p className="text-white dark:text-white mb-4">
          About this NFT: This NFT is a unique digital asset that represents
          ownership of a specific item or content.
        </p>
        <p className="text-white dark:text-white">
          It is stored on the blockchain, making it secure and transparent.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;