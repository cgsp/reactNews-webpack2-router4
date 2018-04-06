import React from 'react';
import { Tabs, Carousel } from 'antd';
import MobileHeaderComponent from '../mobile-header/mobile-header';
import MobileFooterComponent from '../mobile-footer/mobile-footer';
import MobileList from '../mobile-list/mobile-list';
import MobileListPullToRefresh from '../mobile-list-pull-refresh/mobile-list-pull-refresh';

const TabPane = Tabs.TabPane;

export default class MobileIndexComponent extends React.Component {
  constructor() {
    super();
  }
  tabChange(key) {

  }
  render() {
    const carouselSetting = {
      dots: true,
      autoplay: true,
      speed: 100,
      effect: 'scrollx'
    }

    const carouselBoxStyle = {
      width: '100%',
      padding: '10px',
      paddingTop: '0px'
    }
    return (
      <div className="mobile">
        <MobileHeaderComponent />
        <Tabs defaultActiveKey="1" onChange={this.tabChange.bind(this)}>
          <TabPane tab="头条" key="1">
            {/*轮播图*/}
            <div className="clearfix" style={carouselBoxStyle}>
              <div className="carousel">
                <Carousel {...carouselSetting}>
                  <div><img width="100%" src="./src/images/carousel/carousel_1.png" alt="" /></div>
                  <div><img width="100%" src="./src/images/carousel/carousel_2.png" alt="" /></div>
                  <div><img width="100%" src="./src/images/carousel/carousel_3.png" alt="" /></div>
                  <div><img width="100%" src="./src/images/carousel/carousel_4.png" alt="" /></div>
                </Carousel>
              </div>
            </div>
            <MobileList count={20} type={'top'}></MobileList>
          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileList count={20} type={'shehui'}></MobileList>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileListPullToRefresh count={20} type={'guonei'}></MobileListPullToRefresh>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileList count={20} type={'guoji'}></MobileList>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList count={20} type={'yule'}></MobileList>
          </TabPane>
        </Tabs>
        <MobileFooterComponent />
      </div>
    );
  };
}
