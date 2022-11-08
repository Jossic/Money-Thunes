import React, { useState, useEffect } from 'react';

function Category({ category }) {
  return (
    <div className="w-full mb-3 mt-1 border-b-2 border-dark align-start">
      <h3>{category.name}</h3>
    </div>
  );
}

export default Category;
