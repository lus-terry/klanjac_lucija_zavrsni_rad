import React from 'react';

const FavouritesIcon = () => {
  return (
    <svg className="h-8  w-8 text-black transition duration-300 transform hover:text-blue-300 " width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
    </svg>
  );
};

export default FavouritesIcon;
