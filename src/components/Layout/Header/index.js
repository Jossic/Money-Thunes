import React from 'react';
import Button from '../../UX/Button';
import Title from '../../UX/Title';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  //ici pour la logique code
  const navigate = useNavigate();

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
      <div>
        <Title title={'MONEY - THUNES'} />
        <ul className="container titre/sous titre">
          <li>Accueil</li>
          <li>Comptes</li>
          <div className="burger menu">
            <li>Échéances</li>
            <li>État</li>
            <li>Budget</li>
          </div>
        </ul>
      </div>
      <div>
        <Button action={() => navigate('/infos')} text={'Mes infos'} />
        <Button action={(e) => logout(e)} text={'Déconnexion'} />
      </div>
    </header>
  );
}
