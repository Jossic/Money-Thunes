import React, { useState, useEffect } from 'react';
import Category from './Category';

function CategoriesList({ categories }) {
  return (
    <div className="w-[80%] min-h-[500px] mx-auto mt-3 bg-gray-100 border-1 p-1 items-start">
      {categories.map((category) => {
        return (
          <Category key={category.id} category={category}>
            {/* {category.subCategories.map((subCategory) => (
              <p key={subCategory}>{subCategory}</p>
            ))} */}
          </Category>
        );
      })}
    </div>
  );
}

export default CategoriesList;
