import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const PageCommingSoon = React.lazy(() => import('./views/PageCommingSoon'));
const User = React.lazy(() => import('./views/User'));
const Shop = React.lazy(() => import('./views/Shop'));
const News = React.lazy(() => import('./views/News'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: PageCommingSoon },
  { path: '/user', name: 'User', component: User },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/news', name: 'News', component: News },

];

export default routes;
