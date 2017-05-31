import React from 'react';
import { Link } from 'react-router';
import withStyles from 'withStyles';

import styles from './styles.scss';

const FAQ = ({ children }) => (
  <div className={styles.faq}>
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <img src="/images/logo.svg" alt="Logo" />
      </a>
    </header>
    <section className={styles.main}>
      <aside className={styles.aside}>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link activeClassName={styles.active} to="/conditions">
                Положення Системи про конфіденційність
              </Link>
            </li>
            {/* <li>
              <Link to="/">
                Політика щодо захисту персональних даних та конфіденційної інформації
              </Link>
            </li>
            <li>
              <Link to="/">
                Посилання на інші сайти
              </Link>
            </li> */}
          </ul>
        </nav>
      </aside>
      <section className={styles.content}>
        {children}
      </section>
    </section>
  </div>
);

export default withStyles(styles)(FAQ);
