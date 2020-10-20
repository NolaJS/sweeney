import juice from 'juice';
import doc from './layoutStr';
import styles from './stylesStr';

const getLayout = ({ content, title }) => {
  const docStr = doc
    .replace('{{styles}}', styles)
    .replace('{{title}}', title)
    .replace('{{content}}', content);

  return juice(docStr);
};

export default getLayout;
