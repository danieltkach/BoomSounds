import React from 'react';
import styles from './InfoMusician.module.css';
import { Link } from 'react-router-dom';

const InfoMusician = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Información Para Músicos</h1>
        <p>
          BoomSounds acerca tu música a todo el que la necesite en sus
          producciones. Ya sean películas, cortos video juegos, comerciales,
          para televisión, radio, redes sociales, etc.
        </p>
        <p>
          Para obener más información sobre cómo formar parte de BoomSounds
          envía un email a:{' '}
          <a href="mailto:info@boomsounds.com">info@boomsounds.com</a>
        </p>
        <p>¡Gracias por tu interés en nuestra propuesta!</p>
      </div>
    </>
  );
};

export default InfoMusician;
