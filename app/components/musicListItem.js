import React, { Component } from 'react';
import './musicListItem.scss';

class MusiclistItem extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    let musicItem = this.props.musicItem;

    return(
      <li
        key={musicItem.key}
        className={`components-musiclistitem row ${this.props.focus ? 'focus' : ''}`}
      >
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p className="-col-auto delete"></p>
      </li>
    )
  }

}

export default MusiclistItem;
