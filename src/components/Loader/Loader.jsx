import React from 'react';
import ContentLoader from 'react-content-loader';

const HeadBodyGrid = () => (
  <ContentLoader height="1000" width="100%" viewBox="0 0 250 150">
    <rect x="15" y="0" rx="2" ry="2" width="350" height="150" />
    <rect x="15" y="230" rx="2" ry="2" width="170" height="20" />
    <rect x="60" y="230" rx="2" ry="2" width="170" height="20" />
  </ContentLoader>
);

HeadBodyGrid.metadata = {
  name: 'Didier Munezero',
  github: 'didiermunezero',
  description: 'Grid for content of head and body',
  filename: 'HeadBodyGrid',
};

export default HeadBodyGrid;
