import React from 'react';

function NoTransaction({ name }) {
  return (
    <div className="h-10 border-2 shadow-lg shadow-gray-300 flex mb-4 xl:h-16 bg-primary flex items-center justify-center">
      <p className="italic text-sm text-center pl-2">
        Pas de transaction pour {name} pour le moment
      </p>
    </div>
  );
}

export default NoTransaction;
