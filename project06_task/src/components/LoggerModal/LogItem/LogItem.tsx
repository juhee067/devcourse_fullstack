import React from 'react';
import { ILogItem } from '../../../store/types';

type ILogItemProps = {
  LogItem: ILogItem;
};
const LogItem = ({ LogItem }: ILogItemProps) => {
  return <div>LogItem</div>;
};

export default LogItem;
