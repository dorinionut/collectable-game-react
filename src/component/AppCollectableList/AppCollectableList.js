import React, {Component} from 'react';


import CollectionService from '../../service/CollectionService.js';
import COLLECTABLES from '../../data/collectables';

import './AppCollectableList.less';

export default class AppCollectableList extends Component {

  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
  }

  add(item) {
    CollectionService.api.add(item);
  }

  render() {
    let collectables = COLLECTABLES.map(item => {
      return (
        <div className="collectable-wrapper" key={item.id} onClick={this.add.bind(this, item)}>
          <div className="collectable">
            {item.id}
          </div>
        </div>
      );
    });

    return (
      <div className="collectable-container">
        {collectables}
      </div>
    );
  }
}
