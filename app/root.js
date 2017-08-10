import React, {Component} from 'react';
import Header from './components/header';
import Player from './containers/player';
import {MUSIC_LIST} from './config/musiclist';

class Root extends Component {

  constructor(props) {
    super(props),
    this.state = {
      cuerrentMusicItem: MUSIC_LIST[0]
    }
  }

  componentDidMount() {

    $('#player').jPlayer({
      ready: () => {
        $('#player').jPlayer('setMedia', {mp3: this.state.cuerrentMusicItem.file}).jPlayer('play');
      },
      supplied: 'mp3',
      wmode: 'window'
    });

  }

  render() {
    return (
      <div>
        <Header/>
        <Player cuerrentMusicItem={this.state.cuerrentMusicItem}/>
      </div>
    );
  }
}

export default Root;
