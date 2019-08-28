class Fight {
  constructor(player1, player2){
    this._players = [player1, player2];
    this._actions = [null, null];

    this._sendToPlayers('Fight starts!');

    this._players.forEach( (player, idx) => {
      player.on('action', (action) => {
        this._onTurn(idx, action);
      })
    })
  }

  _sendToPlayer(playerIndex, msg){
    this._players[playerIndex].emit('message', msg);
  }

  _sendToPlayers(msg){
    this._players.forEach( (player) => {
      player.emit('message', msg);
    })
  }

  _onTurn(playerIndex, action) {
    this._actions[playerIndex] = action;
    this._sendToPlayer(playerIndex, `You selected ${action}`);

    this._checkGameOver();
  }

  _checkGameOver() {
    const actions = this._actions;
    console.log(actions);

    if(actions[0] && actions[1]) {
      this._sendToPlayers('Game over: ' + actions.join(' - '));
      this._actions = [null, null];
      this._sendToPlayers('New turn');
    }
  }
}

module.exports = Fight;