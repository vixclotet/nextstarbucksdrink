/* eslint-disable prettier/prettier */
import React from 'react';
import Link from 'next/link';

const Banner: React.FC = () => {
  return (
    <div className="bg-violet-500 text-white w-full py-4 text-center">
      <p>
        Meet and Connect with other Starbucks Lovers by sharing your favorite
        drink!
        <Link
          href="https://www.nextstarbucksdrink.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          here
        </Link>
      </p>
    </div>
  );
};

export default Banner;
