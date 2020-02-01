import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const NewsView = React.lazy(() => import('./view'));
const NewsInsert = React.lazy(() => import('./insert'));
const NewsUpdate = React.lazy(() => import('./update'));

class NewsMain extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/news" name="Login Page" render={props => <NewsView {...props} />} />
            <Route exact path="/news/insert" name="Login Page" render={props => <NewsInsert {...props} />} />
            <Route exact path="/news/update/:news_code" name="Login Page" render={props => <NewsUpdate {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (NewsMain);
