import * as React from 'react';

import styles from "./EasyTabs.module.scss";

export interface IGreeterProps {
  name: string;
}

const Greeter = ({ name }: IGreeterProps) => (
  <div>
    Hello {name}!
  </div>
);

export default Greeter;