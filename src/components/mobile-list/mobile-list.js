import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'whatwg-fetch';
import Tloader from 'react-touch-loader';
export default class MobileList extends Component {
  constructor() {
    super();
    this.state = {
      news: '',
      // 用于下拉刷新的几个参数
      count: 5,
      hasMore: 0,
      initializing: 1,
      refreshedAt: Date.now()
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

  loadMore(resolve) {
    setTimeout(() => {
      let count = this.state.count;
      this.setState({
        count: count + 5
      })


      const myFetchOptions = {
        method: 'GET'
      }

      fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.state.count, myFetchOptions)
        .then(res => res.json())
        .then(json => {
          this.setState({ news: json })
        })

      this.setState({
        hasMore: count > 0 && count < 50
      })


      resolve();

    }, 2e3);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hasMore: 1,
        initializing: 2
      })
    }, 2e3);
  }

  render() {
    const { news, hasMore, initializing, refreshedAt } = this.state;
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
            <Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
              {newsList}
            </Tloader>
          </Col>
        </Row>
      </div>
    );
  }
}