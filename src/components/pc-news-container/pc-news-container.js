import React, { Component } from 'react';
import { Row, Col, Tabs, Carousel } from 'antd';
import PcNewsBlock from '../pc-news-block/pc-news-block';
import PcNewsImagesBlock from '../pc-news-image-block/pc-news-image-block';
import PCProducts from '../pc-products/pc-products';
const TabPane = Tabs.TabPane;
export default class PcNewsContainer extends Component {
	constructor() {
		super();
	}

	render() {
		const carouselSetting = {
			dots: true,
			autoplay: true,
			speed: 100,
			effect: 'scrollx'
		}
		return (
			<div>
				<Row>
					<Col span={20} offset={2} className="container">
						<div className="leftContainer">
							{/*============轮播图===========*/}
							<div className="carousel">
								<Carousel {...carouselSetting}>
									<div><img width="400" height="200" src="./src/images/carousel/carousel_1.png" alt="" /></div>
									<div><img width="400" height="200" src="./src/images/carousel/carousel_2.png" alt="" /></div>
									<div><img width="400" height="200" src="./src/images/carousel/carousel_3.png" alt="" /></div>
									<div><img width="400" height="200" src="./src/images/carousel/carousel_4.png" alt="" /></div>
								</Carousel>
							</div>
							{/*==========轮播图下面的新闻================*/}
							<PcNewsImagesBlock count={6} type={'guoji'} width={'400px'} cardTitle={'国际头条'} imageWidth={'106px'} />
						</div>
						{/*=============右边的图片tabs===================*/}
						<Tabs className="tabs_news">
							<TabPane tab="头条" key="1">
								<PcNewsBlock width="100%" bordered="false" count={21} type={'top'} />
							</TabPane>
							<TabPane tab="国际" key="2">
								<PcNewsBlock width="100%" bordered="false" count={21} type={'guoji'} />
							</TabPane>
							<TabPane tab="国内" key="3">
								<PcNewsBlock width="100%" bordered="false" count={21} type={'guonei'} />
							</TabPane>
						</Tabs>
						<Tabs className="tabs_product">
							<TabPane tab="产品" key="1">
								<PCProducts />
							</TabPane>
						</Tabs>
						{/*底部的*/}
						<div>
							<PcNewsImagesBlock count={22} type={'guoji'} width={'100%'} cardTitle={'娱乐新闻'} imageWidth={'110px'} />
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}