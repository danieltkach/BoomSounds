import React from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className={styles.main_section}>
        <img
          className={styles.background_image}
          src="./jpg/blue-concert4.jpg"
          alt="concert crowd"
        />
        <img
          className={styles.logo_banner}
          src="./jpg/boomsounds1.jpg"
          alt=""
        />
      </div>

      <div className={styles.user_options}>
        <Link to="/catalog">
          <button className={styles.btn_wanting_music}>Busco Música</button>
        </Link>
        <Link to="/info-musician">
          <button className={styles.btn_musician}>Soy Músico</button>
        </Link>
      </div>

      <div className={styles.members_footer}>
        <a href="https://github.com/Dylnnn" target="_blank"><img src="./Dylan.jpg" alt="Dylan" /></a>
        <a href="https://github.com/chulas21" target="_blank"><img src="./Francisco.jpg" alt="Francisco" /></a>
        <a href="https://github.com/AgustinBessone32" target="_blank"><img src="./Agustín.jpg" alt="Agustín" /></a>
        <a href="https://github.com/fhtallarico" target="_blank"><img src="./Federico.jpg" alt="Federico" /></a>
        <a href="https://github.com/danieltkach" target="_blank"><img src="./Daniel.jpg" alt="Daniel" /></a>
      </div>
    </>
  );
};

export default Home;
