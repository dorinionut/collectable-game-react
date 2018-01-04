import React, {Component} from 'react';

import CollectionService from '../../service/CollectionService.js';
import COLLECTABLES from '../../data/collectables';

import './AppScoreboard.less';

export default class AppScoreboard extends Component {
  constructor(props) {
    super(props);
    this.collection = {};
    this.state = {
      items : []
    };
  }

  componentDidMount(){
    CollectionService.api.get().subscribe({
      next : (collection) => {
        this.collection = collection;
        this.setState({items : this.collection.items.length});
      }
    });
  }

  render() {

    let collectedItems = this.collection.items;
    let collectionBonus = this.collection.bonus;
    let collectionScore = this.collection.score;

    return ([
      <h1 key="scoreboard-header">Player items</h1>,
      <div className="scoreboard"  key="scoreboard-body">
        <div className="header">
          <div className="column">Item</div>
          <div className="column">Qty</div>
          <div className="column">Score</div>
        </div>
        <div className="item-container">
          { (collectedItems && collectedItems.length) ?
            collectedItems.map(item => {
              return (
                <div className="item" key={'scoreboard-' + item.id}>
                  <div className="column">{item.id}</div>
                  <div className="column">{item.quantity}</div>
                  <div className="column">{item.score}</div>
                </div>
              );
            }) : (
              <div className="no-items">You have no items collected</div>
            )
          }
        </div>
        <div className="bonus">Bonus: {collectionBonus ? collectionBonus : '0'}</div>
        <div className="total">Total: {collectionScore ? collectionScore : '0'}</div>
      </div>
    ]);
  }
}
