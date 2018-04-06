import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Row, Col, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal, Card, notification } from 'antd';
import 'whatwg-fetch';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
// 表单的校验函数
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class CommonComments extends Component {
  constructor() {
    super();
    this.state = {
      comments: ''
    }
  }

  componentWillMount() {
    console.log(this.props.uniquekey)
  }
  componentDidMount() {
    // 一开始的时候，就开启表单的自动校验的功能
    this.props.form.validateFields();
    let fetchOptions = {
      method: 'GET'
    }
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey, fetchOptions)
      .then(res => res.json())
      .then(json => {
        this.setState({ comments: json })
      })

  }

  handleSubmit(e) {
    e.preventDefault();
    let fetchOptions = {
      method: 'GET'
    }
    // 如果表单验证不通过，就不提交表单
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey + '&commnet=' + values.comment, fetchOptions)
          .then(res => res.json())
          .then(json => {
            this.componentDidMount();
          })
      }
    })
  }

  addUserCollection() {
    let myFectionOption = {
      method: 'GET'
    }

    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey, myFectionOption)
      .then(res => res.json())
      .then(json => {
        // 收藏成功之后的全局的提示
        notification['success']({ message: 'ReactNews的提醒', description: '收藏此文章成功' });
      })
  }

  render() {
    // 表单的常用的属性
    const { getFieldDecorator, getFieldError, getFieldsError, isFieldTouched } = this.props.form;
    const commentError = isFieldTouched('comment') && getFieldError('comment');

    const { comments } = this.state;
    const commentList = comments.length ?
      comments.map((item, index) => (
        <Card key={index} title={item.UserName} extra={<a href="#">发布于 {item.datetime}</a>}>
          <p>{item.Comments}</p>
        </Card>
      ))
      : '暂时没有任何评论';
    return (
      <div className="comment">
        <Row>
          <Col span={24}>
            {commentList}
            <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
              <FormItem label="您的评论" validateStatus={commentError ? 'error' : ''} help={commentError || ''}>
                {getFieldDecorator('comment', {
                  rules: [{ required: true, message: '评论不能为空' }, { min: 6, message: '评论不能小于6位' }],
                })
                  (
                  <Input type="textarea" prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入评论" />
                  )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>提交评论</Button>
                &nbsp;&nbsp;&nbsp;
                <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CommonComments = Form.create({})(CommonComments);