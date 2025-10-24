'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '@/Component/Navbar';
import CardHome from '@/Component/Cards/CardHome';
import SignIn from '@/Component/Login/SignupModal';

const images = [
  "https://picsum.photos/1200/800?random=1",
  "https://picsum.photos/1200/800?random=2",
  "https://picsum.photos/1200/800?random=3",
  "https://picsum.photos/1200/800?random=4",
  "https://picsum.photos/1200/800?random=5",
];

function Page() {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      let randomImage;
      do {
        randomImage = images[Math.floor(Math.random() * images.length)];
      } while (randomImage === currentImage);
      setCurrentImage(randomImage);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="w-full h-[30rem] relative overflow-hidden">
        <img
          src={currentImage}
          alt="Hero"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">Welcome to Gatherus</h1>
        </div>
      </div>

      {/* SignIn Section */}
      <div className="p-10">
        <SignIn />
      </div>

      {/* Cards Section */}
      <div className="text-4xl p-10">
        <h1 className="text-white mb-6">Card Content</h1>
        <div className="flex flex-row gap-6 overflow-x-auto">
          <CardHome firstname="John Doe" event={{description:"An exciting event about technology and innovation.", date:"2023-10-15", location:"New York", price:50, image:"https://picsum.photos/500/500?random=1"}}/>
          <CardHome firstname="Jane Smith" event={{description:"Join us for a fun-filled day of activities and networking.", date:"2023-11-20", location:"San Francisco", price:0, image:"https://picsum.photos/500/500?random=2"}}/>
          <CardHome firstname="Alice Johnson" event={{description:"A workshop on personal development and growth.", date:"2023-12-05", location:"Chicago", price:30, image:"https://picsum.photos/500/500?random=3"}}/>
        </div>
      </div>
    </>
  );
}

export default Page;
