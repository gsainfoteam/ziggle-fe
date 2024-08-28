'use client';

import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

const NotionWrapper = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  if (!recordMap) {
    return null;
  }

  return <NotionRenderer recordMap={recordMap} fullPage={false} />;
};

export default NotionWrapper;
