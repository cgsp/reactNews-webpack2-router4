import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'whatwg-fetch';
import ReactPullToRefresh from 'react-pull-to-refresh';
import { resolve } from 'path';
export default class MobileListPullToRefresh extends Component {
  constructor() {
    super();
    this.state = {
      news: '',
    }
  }

  componentWillMount() {
    const myFetchOptions = {
      method: 'GET'
    }

    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, myFetchOptions)
      .then(res => res.json())
      .then(json => {
        this.setState({ news: json })
      })
  }

  handleRefresh(resolve) {
    const myFetchOptions = {
      method: 'GET'
    }

    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=yule&count=' + 20, myFetchOptions)
      .then(res => res.json())
      .then(json => {
        this.setState({ news: json })
        resolve();
      })
  }

  render() {
    const { news } = this.state;
    const newsList = news.length ?
      news.map((item, index) => (
        <section key={index} className="m_article list-item special_section clearfix">
          <Link to={`details/${item.uniquekey}`}>
            <div className="m_article_img">
              <img src={item.thumbnail_pic_s} alt={item.title} />
            </div>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{item.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{item.realtype}</span>
                  <span className="m_article_time">{item.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))

      : '抱歉，没加载到任何新闻';
    return (
      <div>
        <Row>
          <Col span={24}>
            <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)} style={{ textAlign: 'center' }}>
              <span className="genericon genericon-next"></span>
              <div>
                {newsList}
              </div>
            </ReactPullToRefresh>
          </Col>
        </Row>
      </div>
    );
  }
}