import React from 'react';
import { Row, Col, Menu, Icon, message, Form, Input, Tabs, Button, Modal } from 'antd';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'whatwg-fetch';
// 用于表单提交的
const FormItem = Form.Item;
// Tabs
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}


class PcHeaderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    }
  }

  componentDidMount() {
    // 一开始的时候，就开启表单的校验模式
    this.props.form.validateFields();

    // 判断是否登录
    if (localStorage.userId) {
      this.setState({
        userId: localStorage.userId,
        hasLogined: true,
        userNickName: localStorage.userNickName
      })
    }
  }

  // 表单提交
  handleSubmit(e) {
    // 阻止默认行为
    e.preventDefault();
    let formData;
    // 如果表单验证不通过，就不提交表单
    this.props.form.validateFields((err, values) => {
      formData = values;
      console.log(values);
    });

    let formFetcheOptions = {
      method: 'GET'
    }

    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + formData.userName + '&password=' + formData.userName + '&r_userName=' + formData.r_userName + '&r_password=' + formData.r_password + '&r_passwordConfirm=' + formData.r_passwordConfirm)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          userNickName: json.NickUserName,
          userId: json.UserId
        });

        if (this.state.action === 'login') {
          this.setState({
            hasLogined: true
          })

          localStorage.userId = this.state.userId;
          localStorage.userNickName = this.state.userNickName;
        }

        message.success('请求成功');
        this.loginModalShow(false);

      })





  }
  loginModalShow(value) {
    this.setState({
      modalVisible: value
    })
  }

  handleClick(e) {
    this.setState({
      current: e.key
    })
    if (e.key === 'register') {
      this.loginModalShow(true);
    }
  }

  // tab栏切换的时候
  tabOnChange(key) {
    if (key === '2') {
      this.setState({
        action: 'register'
      })
    } else {
      this.setState({
        action: 'login'
      })
    }
  }

  // 退出登录 
  loginOut() {
    localStorage.userId = '';
    localStorage.userNickName = '';
    this.setState({
      hasLogined: false
    });
  }

  render() {
    // 表单的常用属性
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // 表单被触碰了，才会显示错误提示
    const r_userNameError = isFieldTouched('r_userName') && getFieldError('r_userName');
    const r_passwordError = isFieldTouched('r_password') && getFieldError('r_password');
    const r_passwordConfirmError = isFieldTouched('r_passwordConfirm') && getFieldError('r_passwordConfirm');
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');



    const userShow = this.state.hasLogined
      ?
      <Menu.Item key="logout" className="register">
        <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        &nbsp;&nbsp;
        <Link to={'/userCenter'} className="center">
          <Button type="dashed" htmlType="button">个人中心</Button>
        </Link>
        &nbsp;&nbsp;
        <Button type="ghost" htmlType="button" onClick={this.loginOut.bind(this)}>退出</Button>
      </Menu.Item>
      :
      <Menu.Item key="register" className="register" onClick={this.loginModalShow.bind(this)}>
        <Icon type="appstore" />注册/登录
      </Menu.Item>;
    return (
      <header>
        <Row>
          <Col span={4} offset={2}>
            <a href="/" className="pc-logo">
              <img src="/src/images/icon/logo.png" alt="logo" width="50" height="50" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
              <Menu.Item key="top">
                <Icon type="appstore-o" />头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />体育
              </Menu.Item>
              <Menu.Item key="app">
                <Icon type="appstore" />科技
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />时尚
              </Menu.Item>
              {userShow}
            </Menu>
          </Col>
        </Row>
        {/*注册登录的模态框*/}
        <Modal title="用户中心" warpClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.loginModalShow(false)} onOk={() => this.loginModalShow(false)} okText="关闭">
          <Tabs defaultActiveKey="1" type="card" onChange={this.tabOnChange.bind(this)}>
            <Tabs.TabPane tab="登录" key="1">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="用户名" validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '用户名不能为空' }, { min: 6, message: '用户名不能小于6位' }],
                  })
                    (
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户民" />
                    )}
                </FormItem>
                <FormItem label="密码" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '密码不能为空' }, { min: 6, message: '密码不能小于6位' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">登录</Button>
                </FormItem>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="注册" key="2">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="用户名" validateStatus={r_userNameError ? 'error' : ''} help={r_userNameError || ''}>
                  {getFieldDecorator('r_userName', {
                    rules: [{ required: true, message: '用户名不能为空' }, { min: 6, message: '用户名不能小于6位' }],
                  })
                    (
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户民" />
                    )}
                </FormItem>
                <FormItem label="密码" validateStatus={r_passwordError ? 'error' : ''} help={r_passwordError || ''}>
                  {getFieldDecorator('r_password', {
                    rules: [{ required: true, message: '密码不能为空' }, { min: 6, message: '密码不能小于6位' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem label="确认密码" validateStatus={r_passwordConfirmError ? 'error' : ''} help={r_passwordConfirmError || ''}>
                  {getFieldDecorator('r_passwordConfirm', {
                    rules: [{ required: true, message: '确认密码不能为空' }, { min: 6, message: '确认密码不能小于6位' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入确认密码" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
              </Form>
            </Tabs.TabPane>
          </Tabs>
        </Modal>

      </header>
    );
  }
}

export default PcHeaderComponent = Form.create({})(PcHeaderComponent);


