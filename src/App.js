import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './components/csshake-horizontal.min.css';
import './App.css';
import Custom from './components/Calc/Custom';
import Sidebar from './components/Sidebar';
import Terminal from './components/Calc/Terminal';
import Macwidget from './components/Calc/Macwidget';

const App = () => {
  const routes = [
    { name: 'custom', exact: true, path: '/', component: () => <Custom /> },
    { name: 'custom', exact: true, path: '/calc/', component: () => <Custom /> },
    { name: 'custom', exact: true, path: '/calc/custom', component: () => <Custom /> },
    { name: 'terminal', exact: true, path: '/calc/terminal', component: () => <Terminal /> },
    { name: 'macwidget', exact: true, path: '/calc/macwidget', component: () => <Macwidget /> },
  ];

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main">
          {routes.map((route, index) => (
            <Route key={index} exact={route.exact} path={route.path} component={() => (
              <section className={`calc-${route.name}-container`}>
                {route.component()}
              </section>
            )}/>
          ))}
        </div>
      </div>
    </Router>
  );
};

export default App;
