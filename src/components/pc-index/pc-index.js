import React from 'react';
import PcHeaderComponent from '../pc-header/pc-header';
import PcNewsContainer from '../pc-news-container/pc-news-container';
import PcFooterComponent from '../pc-footer/pc-footer';

export default class PcIndexComponent extends React.Component {
  render() {
    return (
      <div className="pc">
        <PcHeaderComponent />
        <PcNewsContainer />
        <PcFooterComponent />
      </div>
    );
  };
}
