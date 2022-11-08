import React from 'react';
import Button from '../../UX/Button';
import Title from '../../UX/Title';
import { BrowserRouter as navigate, Link } from 'react-router-dom';
import Logo from '../../../asset/Logo_moneYthunes.png';
import Colors from '../../../constants/Colors';
import { logoutUser } from '../../../actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function DesktopHeader() {
  const navigate = useNavigate();
  //fonction de deconnexion
  function logout(e) {
    e.preventDefault();
    logoutUser();
    navigate('/signin');
  }

  return (
    <header className="flex bg-[#dfd0d066] flex-row h-24 justify-between shadow-md shadow-gray-400">
      <div className="w-36 self-center ml-0 mb-4.md:w-1/5 md:flex md:justify-center md:align-center h-[95%]">
        <img className="md:w-4/5 object-contain" src={Logo} alt="logo de moneythunes" />
      </div>
      <div className="flex flex-col justify-around items-center h-full md:w-3/5">
        <Title title={'MONEY - THUNES'} color={Colors.secondary} size="large" />
        <ul className="md:flex md:w-full md:justify-around">
          <li>
            <Link
              className="flex flex-row w-full justify-around text-secondaryBlue font-semibold focus:font-extrabold"
              to="/">
              Accueil
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row w-full justify-around text-secondaryBlue font-semibold focus:font-extrabold"
              to="/account">
              Comptes
            </Link>
          </li>

          <li>
            <Link
              className="flex flex-row w-full justify-around text-secondaryBlue font-semibold focus:font-extrabold"
              to="/dealines">
              Échéances
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row w-full justify-around text-secondaryBlue font-semibold focus:font-extrabold"
              to="/state">
              État
            </Link>
          </li>
          {/* <li>
              <Link to="/">Budget</Link>
            </li> */}
        </ul>
      </div>
      <div className="flex w-full justify-around items-center h-12 bg-secondary text-white md:h-full md:w-40">
        {/* <Button onClick={() => navigate('/infos')} name={'Mes infos'} /> */}
        <Button onClick={(e) => logout(e)} name={'Déconnexion'} />
      </div>
    </header>
  );
}
