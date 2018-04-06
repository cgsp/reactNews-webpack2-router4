import React, { Component } from 'react';
import { Card } from 'antd';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'whatwg-fetch';
export default class PcNewsImagesBlock extends Component {
	constructor() {
		super();
		this.state = {
			news: ''
		}
	}

	componentWillMount() {
		let fetchOptions = {
			method: 'GET'
		}
		fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, fetchOptions)
			.then(res => res.json())
			.then(json => {
				this.setState({ news: json })
			})
	}

	render() {
		const { news } = this.state;
		const styleImage = {
			display: 'block',
			width: this.props.imageWidth,
			height: '90px'
		};
		const styleH3 = {
			width: this.props.imageWidth,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		};
		const newsList = news.length ?
			news.map((item, index) => (
				<div key={index} className="imageblock">
					<Link to={`details/${item.uniquekey}`} target="_blank">
						<div className="custom-image" style={{ width: this.props.imageWidth}}>
							<img style={styleImage} src={item.thumbnail_pic_s} alt="" />
						</div>
						<div className="custom-card">
							<h3 title={item.title} style={styleH3}>{item.title}</h3>
							<p title={item.author_name} style={styleH3}>{item.author_name}</p>
						</div>
					</Link>
				</div >
			))
			: '抱歉，没加载到任何的新闻';
		return (
			<div className="topNewsList">
				<Card title={this.props.cardTitle} bordered={true} style={{ width: this.props.width}}>
					{newsList}
				</Card>
			</div >
		);
	}
}

