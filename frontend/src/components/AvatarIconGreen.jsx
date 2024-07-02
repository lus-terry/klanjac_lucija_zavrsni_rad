import React from 'react';

const AvatarIconGreen = ({onClick, name}) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : '';

  return (
      <span className="h-6 w-6 text-base pl-1 justify-center items-center text-center inline-block rounded-full border-black border-2  hover:text-blue-300 hover:border-blue-300 hover:transition duration-300 "  onClick={onClick}>
       {firstLetter}
      </span>

  );
};

export default AvatarIconGreen;
