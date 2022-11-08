import React from 'react';

export default function AccountContainer({ children }) {
  return <div className="min-h-screen flex flex-col md:flex-row md:w-full xl:pr-2">{children}</div>;
}
