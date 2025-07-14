
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SideMenu from './SideMenu';
import React, { useState } from 'react';
import "./NavBar.css"

const NavBar = () => {
    const [tabs, setTabs] = useState(
        ["Home", "about", "contact", "shop"]
    );
  const [sidMenuIndex, setSidMenuIndex] = useState(0);

    return (
      <div className="col-12 bg-dark d-flex p-3 justify-content-between" id='NavBar' onClick={()=>{setSidMenuIndex(0)}}>
        <ul className="d-flex gap-4 mb-0">
          {tabs.map((el, index) => {
            return (
              <li key={index} style={{ color: "white", listStyle: "none" }}>
                {el}
              </li>
            );
          })}
        </ul>
        <FontAwesomeIcon  onClick={(e) => {
         e.stopPropagation()
          sidMenuIndex == 1 ? setSidMenuIndex(0) : setSidMenuIndex(1)

        }} className='icon px-4'  icon={faBars} />
       
       
        {
          sidMenuIndex==1?<SideMenu/>:null
        }
   

      </div>
       
    );
}
 
export default NavBar;
