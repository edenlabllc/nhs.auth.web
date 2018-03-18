import React from "react";
import withStyles from "withStyles";

import styles from "./styles.css";

const MainComponent = ({ id, children }) => (
  <section className={styles.main} id={id}>
    {children}
  </section>
);
export const Main = withStyles(styles)(MainComponent);

const HeaderComponent = ({ children }) => (
  <header className={styles.header}>{children}</header>
);
export const Header = withStyles(styles)(HeaderComponent);

const ArticleComponent = ({ children }) => (
  <article className={styles.form}>{children}</article>
);
export const Article = withStyles(styles)(ArticleComponent);
