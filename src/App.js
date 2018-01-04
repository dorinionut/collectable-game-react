import React, {Component} from 'react';

import CollectionService from './service/CollectionService.js';

import AppCollectableList from './component/AppCollectableList/AppCollectableList';
import AppScoreboard from './component/AppScoreboard/AppScoreboard';

export default class App extends Component {

  reset() {
    CollectionService.api.reset();
  }

  render() {
    return ([
      <main key="main">
        <header>K! Points <button className="button-primary" onClick={this.reset}>New Game</button></header>
        <AppCollectableList/>
      </main>,
      <aside key="scoreboard">
        <AppScoreboard/>
      </aside>
    ]);
  }
}
