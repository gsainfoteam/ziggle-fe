'use client';

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

import { NotionRenderer } from 'react-notion-x';
import useSWR from 'swr';

import { getGroupNotion } from '@/api/group/group';

interface GroupIntroTabProps {}

const GroupIntroTab = ({}: GroupIntroTabProps) => {
  const { data, isLoading } = useSWR('2024-GIST-Developers-Night-1292632ae49843a79fb3e554c6a926c1', // example page id
    getGroupNotion
  );

  return (
    <div className={"mt-5"}>
      {data && (
        <NotionRenderer recordMap={data} fullPage={false} />
      )}
    </div>
  );
};

export default GroupIntroTab;
