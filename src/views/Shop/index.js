import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const ShopView = React.lazy(() => import('./view'));
const ShopInsert = React.lazy(() => import('./insert'));
const UserUpdate = React.lazy(() => import('./update'));

class ShopMain extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/shop" name="Login Page" render={props => <ShopView {...props} />} />
            <Route exact path="/shop/insert" name="Login Page" render={props => <ShopInsert {...props} />} />
            <Route exact path="/shop/update/:shop_code" name="Login Page" render={props => <UserUpdate {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (ShopMain);
