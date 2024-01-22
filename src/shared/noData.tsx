import React from "react";
import emptyState from "../assets/images/emptyState.svg";
import styles from "../pages/post/post.module.scss";

interface noDataProps {}

export const NoData: React.FC<noDataProps> = ({}) => {
  return (
    <div className={styles.no_data_state}>
      <img src={emptyState} width={200} alt="Empty" />
      <h3>No Items Added</h3>
    </div>
  );
};
