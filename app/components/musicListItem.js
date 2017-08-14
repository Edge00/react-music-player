import React, { Component } from 'react';
import './musicListItem.scss';
import Pubsub from 'pubsub-js';

class MusiclistItem extends Component {

  constructor(props) {
    super(props)
  }

  chooseMusic(musicItem) {
    Pubsub.publish('CHOOSE_MUSIC', musicItem);
  }

  deleteMudic(musicItem, e) {
    e.stopPropagation();
    Pubsub.publish('DELETE_MUSIC', musicItem);
  }

  render() {

    let musicItem = this.props.musicItem;

    return (
      <li
        key={musicItem.key}
        onClick={this.chooseMusic.bind(this, musicItem)}
        className={`components-musiclistitem row ${this.props.focus ? 'focus' : ''}`}
      >
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p
          onClick={this.deleteMudic.bind(this, musicItem)}
          className="-col-auto delete"
          ></p>
      </li>
    )
  }

}

export default MusiclistItem;
