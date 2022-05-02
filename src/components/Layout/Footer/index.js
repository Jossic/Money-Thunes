import React from 'react';

const Footer = () => {
  return (
    <div className={`bg-[#F1F1F1] dark:bg-gray-900`}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="h-0.5 w-full bg-white dark:bg-gray-700"></div>
        <div className="flex flex-col space-y-0 mt-8">
          <div className="mx-auto">
            <h5>&copy; Money Thunes. Tous droits réservés.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
