import React, { Component } from 'react';
import MusiclistItem from '../components/musicListItem';

class Musiclist extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    let listElements = this.props.musicList.map((item) => {
      return(
        <MusiclistItem
          focus={item === this.props.cuerrentMusicItem}
          key={item.id}
          musicItem={item}
        />
      );
    });

    return(
      <div>
        <ul>
          {listElements}
        </ul>
      </div>
    );
  }

}

export default Musiclist;
