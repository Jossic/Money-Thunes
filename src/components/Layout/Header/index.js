import React from 'react';
import Button from '../../UX/Button';
import Title from '../../UX/Title';
import { BrowserRouter as navigate, Link } from 'react-router-dom';

export default function Header() {
  //fonction de deconnexion
  function logout(e) {
    e.preventDefault();
    console.log('fonctionnalitée a faire plus tard');
  }

  return (
    <header>
      <div className="container logo">
        <img />
      </div>
      <div className="justify-around items-center text-secondary">
        <Title title={'MONEY - THUNES'} />
        <ul className="container titre/sous titre">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/account">Comptes</Link>
          </li>
          <div className="burger menu">
            <li>
              <Link to="/dealines">Échéances</Link>
            </li>
            <li>
              <Link to="/state">État</Link>
            </li>
            {/* <li>
              <Link to="/">Budget</Link>
            </li> */}
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
