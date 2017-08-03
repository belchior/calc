import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './components/csshake-horizontal.min.css';
import './App.css';
import Custom from './components/Calc/Custom';
import Sidebar from './components/Sidebar';
import Terminal from './components/Calc/Terminal';
import Macwidget from './components/Calc/Macwidget';

class App extends Component {
  render() {
    const routes = [
      {name: 'custom', exact: true, path: '/', component: () => <Custom />},
      {name: 'terminal', exact: true, path: '/terminal', component: () => <Terminal />},
      {name: 'macwidget', exact: true, path: '/macwidget', component: () => <Macwidget />}
    ];

    return (
      <Router>
        <div className="App">
          <Sidebar />
          <div className="main">
            {routes.map((route, index) => (
              <Route key={index} exact={route.exact} path={route.path} component={() => (
                <section className={"calc-" + route.name + "-container"}>
                  {route.component()}
                </section>
              )}/>
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
