import React, { useState, useEffect } from 'react';
import Title from '../../UX/Title/index';
import AddCategory from './addCategories/AddCategorieForm';
import CategoriesList from './categorieList/CategoriesList';
import { fakeCategoriesList } from '../../../tests_utils/categoriesListFake';

function HomeCategories() {
  return (
    <div className=" w-full h-full">
      <Title size={'medium'} color={'black'} title={'Gestion des catégories'}></Title>
      <div className="container categories">
        <AddCategory categories={fakeCategoriesList} />
        <CategoriesList categories={fakeCategoriesList} />
      </div>
    </div>
  );
}

export default HomeCategories;
