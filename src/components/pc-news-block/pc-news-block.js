import React, { Component } from 'react';
import { Card } from 'antd';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'whatwg-fetch';
export default class PcNewsBlock extends Component {
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
    const newsList = news.length ?
      news.map((item, index) => (
        <li key={index}>
          <Link to={`details/${item.uniquekey}`} target="_blank">{item.title}</Link>
        </li>
      ))
      : '抱歉，没加载到任何的新闻';
    return (
      <div className="topNewsList">
        <Card>
          <ul>{newsList}</ul>
        </Card>
      </div>
    );
  }
}
