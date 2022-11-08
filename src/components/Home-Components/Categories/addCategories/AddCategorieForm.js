import React, { useEffect, useState } from 'react';
import Button from '../../../UX/Button';
import { fakeCategoriesList } from '../../../../tests_utils/categoriesListFake';

/* à voir plus tard pour stocker plutôt dans le store la liste des catégories */

function AddCategory({ categories }) {
  const [choice, setChoice] = useState('catégorie');
  const [inputValue, setInputValue] = useState('');
  const [isSubCategory, setIsSubCategory] = useState(false);
  function showCategorieForTest(e) {
    e.preventDefault();
    alert('le state est : ' + inputValue);
    console.log('cat state', choice);
    setInputValue('');
  }

  useEffect(() => {
    if (choice === 'sous-catégorie') {
      setIsSubCategory(true);
    } else {
      setIsSubCategory(false);
    }
  }, [choice]);

  // un input liste pour choisir catgorie et sous catégorie
  // vérifier que ça renseigne du coup le bon champ si catégorie ou sous catégorie
  // si sous catégorie, à faire la liste des catégories à ajouter en input
  return (
    <div className="w-[80%] mx-auto p-4 rounded-md bg-gray-200 shadow-xl ">
      <form
        className="w-full h-[200px] flex justify-around items-center flex-col lg:h[150px] xl:h-full xl:flex-row "
        onSubmit={showCategorieForTest}>
        {/* <label id="categorie">Ajouter une catégorie</label> */}
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option value="catégorie">Ajouter une catégorie</option>
          <option value="sous-catégorie">Ajouter une sous-catégorie</option>
        </select>
        {/* {isSubCategory && (
          <div className="flex ">
            <label>Associer à la catégorie :</label>
            <select className=" text-center">
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        )} */}
        <input
          className="w-1/2 pl-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          htmlFor="categorie"></input>
        <Button name={'Valider'}></Button>
      </form>
      {isSubCategory && (
        <div className="flex mt-2 border-2 justify-center xl:justify-around">
          <label className="">Associer à la catégorie :</label>
          <select className=" xl:w-1/2 pl-1 bg-gray-50">
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <div className="w-[0px] xl:w-[80px] "></div>
        </div>
      )}
    </div>
  );
}

export default AddCategory;

/* 
label className="border-1 border-yellow-600 xl:ml-[3%] 2xl:lg:ml-[4%]"

" border-1 border-green-600 xl-3 lg:w-[50%] lg:ml-[7.5%] 2xl:ml-[11%]

*/
