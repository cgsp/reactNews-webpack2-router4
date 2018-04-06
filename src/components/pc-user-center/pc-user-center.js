import React, { Component } from 'react';
import { Row, Col, Modal, Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Card, notification, Upload } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import PcHeaderComponent from '../pc-header/pc-header';
import PcFooterComponent from '../pc-footer/pc-footer';
export default class PCUserCenter extends Component {
  constructor() {
    super();
    this.state = {
      userCollection: '',
      userComments: '',
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        state: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };
  }

  componentDidMount() {
    let fetchOptions = {
      method: 'GET'
    }
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=' + localStorage.userId, fetchOptions)
      .then(res => res.json())
      .then(json => {
        this.setState({ userCollection: json });
      })

    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=' + localStorage.userId, fetchOptions)
      .then(res => res.json())
      .then(json => {
        this.setState({ userComments: json });
      })
  }

  handleCancel() {
    this.setState({ previewVisible: false })
  }
  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange(fileList) {
    this.setState({ fileList })
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { userCollection } = this.state;
    const userCollectionList = userCollection.length ?

      userCollection.map((item, index) => (
        <Card key={index} title={item.uniquekey} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
          <p>{item.Title}</p>
        </Card>
      ))

      : '该用户还没有任何收藏';

    const { userComments } = this.state;
    const userCommentsList = userComments.length ?

      userComments.map((item, index) => (
        <Card key={index} title={`于${item.datetime}评论了文章：${item.uniquekey}`} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
          <p>{item.Comments}</p>
        </Card>
      ))

      : '该用户还没有任何评论';

    return (
      <div>
        <PcHeaderComponent />
        <Row>
          <Col span={16} offset={4}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <div className="comments">
                  <Row>
                    <Col span={24}>
                      {userCollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                {userCommentsList}
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div className="clearfix">
                  <Upload
                    action="http://newsapi.gugujiankong.com/handler.ashx"
                    headers={{ "Access-Control-Allow-Origin": "*" }}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview.bind(this)}
                    onChange={this.handleChange.bind(this)}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <PcFooterComponent />
      </div >
    );
  }
}