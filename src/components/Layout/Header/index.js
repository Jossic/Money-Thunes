import React from 'react';
import Button from '../../UX/Button';
import Title from '../../UX/Title';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../asset/Logo_moneYthunes.png';
import ToLink from '../../UX/Link';

export default function Header() {
  //fonction de deconnexion
  function logout(e) {
    e.preventDefault();
    console.log('fonctionnalitée a faire plus tard');
  }

  const navigate = useNavigate();

  return (
    <header className="flex flex-col bg-primary">
      <div className="w-40 self-center mb-4">
        <img src={Logo} alt="logo de moneythunes" />
      </div>
      <div className="flex flex-col justify-around items-center h-40">
        <Title title={'MONEY - THUNES'} />
        <ul className="flex flex-row w-full justify-around text-secondaryBlue font-semibold">
          <li>
            <ToLink url={'/'} text={'Accueil'}></ToLink>
          </li>
          <li>
            <ToLink url={'/account'} text={'Compte'}></ToLink>
          </li>
          <div className="burger menu">
            <li>
              <ToLink url={'/dealines'} text={'Échéances'}></ToLink>
            </li>
            <li>
              <ToLink url={'/state'} text={'État'}></ToLink>
            </li>
            <li>
              <ToLink url={'/budget'} text={'Budget'}></ToLink>
            </li>
          </div>
        </ul>
      </div>
      <div className="flex w-full justify-around items-center h-12 bg-secondary text-white">
        <Button action={() => navigate('/infos')} text={'Mes infos'} />
        <Button action={(e) => logout(e)} text={'Déconnexion'} />
      </div>
    </header>
  );
}
