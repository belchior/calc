import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';
import iconCustom from '../../images/icon-custom.svg';
import iconTerminal from '../../images/icon-terminal.svg';
import iconMacwidget from '../../images/icon-macwidget.svg';
import iconGithub from '../../images/icon-github.svg';

class Sidebar extends Component {

  render() {
    return (
      <aside className="Sidebar">
        <a className="author" href="https://github.com/belchior">
          <img className="author-avatar" src="https://avatars0.githubusercontent.com/u/2656585?v=3" alt="Fotografia de Belchior Oliveira" />
          <span className="author-name">Belchior Oliveira</span>
        </a>
        <nav className="list internal-links">
          <Link className="list-item link-custom" to="/calc/">
            <img className="list-item-image" src={iconCustom} alt="Calc Custom" />
            <span className="list-item-text">Calc Custom</span>
          </Link>
          <Link className="list-item link-terminal" to="/calc/terminal">
            <img className="list-item-image" src={iconTerminal} alt="Calc Terminal" />
            <span className="list-item-text">Calc Terminal</span>
          </Link>
          <Link className="list-item link-macwidget" to="/calc/macwidget">
            <img className="list-item-image" src={iconMacwidget} alt="Calc Macwidget" />
            <span className="list-item-text">Calc Macwidget</span>
          </Link>
        </nav>
        <nav className="list external-links">
          <a className="list-item link-github" href="https://github.com/belchior/calc">
            <img className="list-item-image" src={iconGithub} alt="Logotipo do GitHub" />
            <span className="list-item-text">Calc no GitHub</span>
          </a>
        </nav>
      </aside>
    );
  }
}

export default Sidebar;
