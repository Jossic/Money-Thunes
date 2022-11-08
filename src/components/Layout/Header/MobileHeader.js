import React, { useState } from 'react';
import { FaHamburger } from 'react-icons/fa';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import Button from '../../UX/Button';
import Title from '../../UX/Title';
import { BrowserRouter as navigate, Link } from 'react-router-dom';
import Logo from '../../../asset/Logo_moneYthunes.png';
import { navLinks } from './NavLink';

function MobileHeader() {
  const [showMenu, setShowMenu] = useState(false);

  function logout(e) {
    e.preventDefault();
    console.log('Alerte clic');
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-[#dfd0d066] h-14">
      <div className="flex justify-between items-center">
        <div className="w-14 h-14">
          <img className="" src={Logo} alt="logo de moneythunes" />
        </div>
        <div>
          <Title title="Money-Thunes" size="medium" color="blue" />
        </div>
        <div
          className="flex justify-center items-center w-12 h-12 shadow-md rounded"
          onClick={toggleMenu}
          onScroll={() => showMenu && setShowMenu(false)}>
          <FaHamburger size={30} />
        </div>
      </div>
      <nav className={showMenu ? 'flex flex-col nav active' : 'flex flex-col nav'}>
        <ul className="w-full p-4" onClick={toggleMenu}>
          {navLinks.map((navLink, index) => (
            <li className="h-14 text-lg" key={index}>
              <Link to={navLink.path}>
                <span className="text-black">{navLink.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex w-full justify-around mt-auto mb-2">
          <div onClick={() => navigate('/infos')} className="rounded-full shadow-md p-2">
            <AiFillSetting size={25} />
          </div>
          <div onClick={logout} className="rounded-full shadow-md p-2">
            <AiOutlineLogout size={25} />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MobileHeader;
