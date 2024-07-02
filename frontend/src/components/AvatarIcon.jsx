import React from 'react';

const AvatarIcon = () => {
  return (
    <span className='group'>
         <span className="inline-block rounded-full border-black border-2 group-hover:border-blue-300 group-hover:transition duration-300">
      <svg className="h-5 w-5 text-black group-hover:text-blue-300 group-hover:transition duration-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      </svg>
    </span>
    </span>
   
  );
};

export default AvatarIcon;
