import React, { Component } from 'react';
import { Row, Col, Modal, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Card, notification, Upload } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import MobileHeaderComponent from '../mobile-header/mobile-header';
import MobileFooterComponent from '../mobile-footer/mobile-footer';
export default class MobileUserCenter extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <MobileHeaderComponent />
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">

              </TabPane>
              <TabPane tab="我的评论列表" key="2">

              </TabPane>
              <TabPane tab="头像设置" key="3">

              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooterComponent />
      </div>
    );
  }
}