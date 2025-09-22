"use client";
import React from "react";
import Image from "next/image";

export const ParallaxScroll = ({
  images,
}: {
  images: string[];
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simple static version for now to avoid hydration issues
  return (
    <div className="h-[300vh] py-20 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, i) => (
          <div
            key={i}
            className="group relative h-[450px] overflow-hidden rounded-lg hover:scale-105 transition-transform duration-700 ease-out"
          >
            <Image
              src={image}
              fill
              alt="Valkyrie Feature"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">Feature {i + 1}</h3>
              <p className="text-sm opacity-90">Valkyrie File Management</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
