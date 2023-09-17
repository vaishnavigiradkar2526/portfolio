import React from "react";
import Switch from "@mui/material/Switch";
import styles from "./Toggle.module.css";

const Toggle = () => {
  return (
    <>
      <div className={styles.ToggleRoot}>
      <Switch className={styles.ToggleBuuton} defaultChecked /></div>
    </>
  );
};

export default Toggle;
