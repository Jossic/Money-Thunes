import React from 'react';

export default function Loader() {
  return (
    <div className="h-full flex justify-center mt-[20%] animate-pulse ">
      <h2 className="text-3xl font-bold" data-testid="charging title">
        Chargement ...
      </h2>
    </div>
  );
}
