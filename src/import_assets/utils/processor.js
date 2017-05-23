import { ItemStates } from './enums';

const cardProcessor = function(asset, cardIndex, cardData, callback) {
  this.setState({
    cards: this.state.cards.set(cardIndex,
      this.state.cards.get(cardIndex).set('state', ItemStates.IMPORTING)),
  });

  // Add the card
  return asset.add({
    cardNumber: cardData.get('cardNumber'),
    pin: cardData.get('pin'),
  }).then(response => {
    if (response.ok) {
      // Asset added successfully
      this.setState({
        cards: this.state.cards.set(cardIndex,
          this.state.cards.get(cardIndex).set('state', ItemStates.SUCCESS)),
      });
      callback(null);
    } else {
      throw Error(response.statusText);
    }
  })
  .catch((error) => {
    this.setState({
      cards: this.state.cards.set(cardIndex,
        this.state.cards.get(cardIndex).set('state', ItemStates.ERROR)),
    });
    callback(error);
  })
};

export default cardProcessor;
