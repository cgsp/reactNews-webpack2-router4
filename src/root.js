import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PcIndexComponent from './components/pc-index/pc-index';
import PcNewsDetails from './components/pc-news-details/pc-news-details';
import MobileIndexComponent from './components/mobile-index/mobile-index';
import MobileNewsDetails from './components/mobile-news-details/mobile-news-details';
import PCUserCenter from './components/pc-user-center/pc-user-center';
import MobileUserCenter from './components/mobile-user-center/mobile-user-center';
export default class Root extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width:1224px)">
          <BrowserRouter>
            <Switch>
              <Route exact path={'/'} component={PcIndexComponent}></Route>
              <Route path={'/details/:uniquekey'} component={PcNewsDetails}></Route>
              <Route path={'/userCenter'} component={PCUserCenter}></Route>
            </Switch>
          </BrowserRouter>
        </MediaQuery>
        <MediaQuery query="(max-device-width:1224px)">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MobileIndexComponent}></Route>
              <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
              <Route path="/userCenter" component={MobileUserCenter}></Route>
            </Switch>
          </BrowserRouter>
          <MobileIndexComponent />
        </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(
  <Root />, document.getElementById('root'));