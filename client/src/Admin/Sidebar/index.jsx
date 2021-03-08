import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import styles from './Sidebar.module.css';
import { IconContext } from 'react-icons';

const Sidebar = () => {
  return (
    <>
      <IconContext.Provider value={{ color: '#ff9703' }}>
        <nav className={styles.sidebar}>
          <ul>
            {SidebarData.map((item, index) =>
              item.visible ? (
                <span className={styles.menu_item}>
                  <li key={index} className={item.cName}>
                    <NavLink
                      activeClassName={styles.active_link}
                      className="sidebar-link"
                      to={item.path}
                    >
                      <span className={styles.menu_item_icon}>{item.icon}</span>
                      <span className={styles.menu_item_title}>
                        {item.title}
                      </span>
                    </NavLink>
                  </li>
                </span>
              ) : null
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
