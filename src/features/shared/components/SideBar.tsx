import React, { useState } from 'react';
import '../css/SideBar.css'
import { NavLink } from 'react-router';

interface SideBarProps {
  items?: { label: string; icon: string, target: string}[];
}

const defaultItems  = [
  { label: 'Dashboard', icon: 'home', target:'home' },
  { label: 'Kurser', icon: 'book_ribbon', target:'testarea2' },
  { label: 'Skapa en kurs', icon: 'add_circle_outline', target:'courses/create' },
  { label: 'Inlämningar', icon: 'assignment', target:'assignments' },
];

export const SideBar: React.FC<SideBarProps> = ({ items }) => {

  //if no items been proped. Use defaultItems
  const displayItems = items && items.length > 0 ? items : defaultItems;

  const [isOpen, setIsOpen] = useState(false);

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sidebar-container">
        <button className="show-button" onClick={toggleAside}><span className="material-symbols-outlined">chevron_right</span></button>
        <aside className={`sidebar${isOpen ? " closed" : ""}`}>
          <button className="close-button" onClick={toggleAside}>
            <span className="material-symbols-outlined">
              highlight_off
            </span>
          </button>
          <ul className="menu">
            {displayItems.map((item, idx) => (
            <li key={idx}>
              <NavLink to={item.target} key={idx} className="menu-item">
                <span className="icon material-symbols-outlined">{item.icon}</span>
                <span className="text">{item.label}</span>
              </NavLink>
            </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};