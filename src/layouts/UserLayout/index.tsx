import React, { FC } from 'react';

import styles from './index.module.scss';

const UserLayout: FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default UserLayout;
