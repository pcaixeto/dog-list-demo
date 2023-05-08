import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './styles/index.module.css';

const IndexPage: React.FC = () => {

  return (
    <div className={styles.container}>
      <h1>Ronaldo</h1>
      <div className={styles.buttonsContainer}>
        <Link href="/dog" className={styles.link} passHref>
          <button className={styles.button}>
            Cachorro
            <span className={styles.buttonDescription}>Lista de cachorros</span>
          </button>
        </Link>
        <Link href="/cat" className={styles.link} passHref>
          <button className={styles.button}>
            Gato
            <span className={styles.buttonDescription}>Lista de gatos</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
