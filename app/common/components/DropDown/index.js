import React from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import OuterClick from "../OuterClick";

import { open, close } from "./redux";
import styles from "./styles.css";

export const Component = props => {
  const { children = [], name, isOpened, onOpen, onClose } = props;

  const childrenArray = React.Children.toArray(children);
  const items = childrenArray.filter(item => item.type === DropDownItem);
  let control = childrenArray.filter(item => item.type === DropDownControl)[0];

  control = React.cloneElement(control, {
    onClick: () => {
      if (isOpened) {
        onClose(name);
      } else {
        onOpen(name);
      }
    }
  });

  return (
    <OuterClick onClick={() => onClose(name)}>
      <section
        className={classnames(styles.dropdown, isOpened && styles.active)}
      >
        {control}
        <ul>{items}</ul>
      </section>
    </OuterClick>
  );
};

export const DropDown = connect(
  (state, { name }) => ({
    isOpened: state.dropDown[name]
  }),
  {
    onOpen: open,
    onClose: close
  }
)(Component);

export const DropDownControl = ({ children, ...props }) => (
  <div className={styles.control} {...props}>
    {children}
  </div>
);

export const DropDownItem = ({
  children,
  active = false,
  separate = false
}) => (
  <li
    className={classnames(
      styles.item,
      active && styles.active,
      separate && styles.separate
    )}
  >
    {children}
  </li>
);
