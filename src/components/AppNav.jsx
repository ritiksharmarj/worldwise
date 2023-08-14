import { Outlet } from 'react-router-dom';
import styles from './AppNav.module.css';

const AppNav = () => {
  return (
    <>
      <nav className={styles.nav}>AppNav</nav>

      <Outlet />
    </>
  );
};

export default AppNav;
