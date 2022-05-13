import React from 'react';
import { Link } from 'react-router-dom';

export default function ToLink({ url, text }) {
  return (
    <Link
      to={url}
      className="flex flex-row w-full justify-around text-secondaryBlue font-semibold focus:font-extrabold">
      {text}
    </Link>
  );
}
