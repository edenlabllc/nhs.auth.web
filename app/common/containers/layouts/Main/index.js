import React from "react";
import withStyles from "withStyles";
import { translate } from "react-i18next";

import styles from "./styles.css";

const App = ({ children, t }) => (
  <div className={styles.main}>
    <main>{children}</main>
    <footer className={styles.footer}>
      ©{new Date().getFullYear()} {t("All Rights Recerved")}
    </footer>
  </div>
);
export default translate()(withStyles(styles)(App));
