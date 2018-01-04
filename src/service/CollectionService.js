import Rx from "rxjs";

import COLLECTABLES from '../data/collectables';

var CollectionService = {
  bonus : 0,
  collection : new Rx.Subject(),
  collectedItems : {},
  score : 0,

  constructor : function() {
    this.bonus = 0;
    this.collectedItems = [];
    this.score = 0;
  },

  add : function(item) {
    this.collectedItems[item.id] = (this.collectedItems[item.id]) ? this.collectedItems[item.id] + 1 : 1;
    this.update();
  },

  get : function() {
    return this.collection.asObservable();
  },

  reset : function() {
    this.collectedItems = [];
    this.update();
  },

  update : function() {
    this.bonus = 0;
    this.score = 0;
    let collectionResult = [];

    for(let id in this.collectedItems) {

      let item = COLLECTABLES.find(c => c.id == id);

      let itemBonus = (item.bonusForEvery > 0) ? Math.floor(this.collectedItems[id] / item.bonusForEvery) * item.bonusValue : 0;
      let itemScore = item.value * this.collectedItems[id] + itemBonus;

      collectionResult.push({
        id: item.id,
        quantity: this.collectedItems[id],
        score: itemScore
      });

      collectionResult = collectionResult.sort((a,b) => (a.id > b.id) ? 1 : -1);

      this.bonus += itemBonus;
      this.score += itemScore;
    }

    this.collection.next({
      bonus: this.bonus,
      items: collectionResult,
      score: this.score
    });
  }
}

module.exports = { api : CollectionService };
