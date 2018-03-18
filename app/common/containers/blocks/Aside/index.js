import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import Nav from "../Nav";
import Gamburger from "../Gamburger";

import { toggleMenu } from "./redux";

import styles from "./styles.css";

@connect(state => state.blocks.Aside, { toggleMenu })
export default class Aside extends React.Component {
  render() {
    const { active, toggleMenu } = this.props;
    return (
      <aside className={styles.aside}>
        {/* eslint-disable jsx-a11y/anchor-has-content */}
        <Link className={styles.logo} to="/">
          {"NHS Admin"}
        </Link>
        <hr className={styles.line} />

        <Nav isOpen={active} />

        <div className={styles["menu-control"]}>
          <Gamburger isOpen={active} onToggle={toggleMenu} />
        </div>
      </aside>
    );
  }
}
