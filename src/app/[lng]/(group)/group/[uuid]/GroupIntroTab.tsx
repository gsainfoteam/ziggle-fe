// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import './styles.css';

import { NotionAPI } from 'notion-client';

import NotionWrapper from './NotionWrapper';

interface GroupIntroTabProps {}

const GroupIntroTab = async ({}: GroupIntroTabProps) => {
  const notion = new NotionAPI();

  const recordMap = await notion.getPage(
    '2024-GIST-Developers-Night-1292632ae49843a79fb3e554c6a926c1',
  );

  console.log('recordMap', recordMap);

  if (recordMap === null) {
    return <div>Notion page not found</div>;
  }

  return (
    <div className={'mt-5'}>
      <NotionWrapper recordMap={recordMap} />
    </div>
  );
};

export default GroupIntroTab;
