import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Header from './components/header';
import Player from './containers/player';
import MusicList from './containers/musicList';
import Pubsub from 'pubsub-js';

import {MUSIC_LIST} from './config/musiclist';

class Root extends Component {

  constructor(props) {
    super(props),
    this.state = {
      musicList: MUSIC_LIST,
      cuerrentMusicItem: MUSIC_LIST[0]
    },
    this.playMusic = this.playMusic
  }

  playMusic() {
    $('#player').jPlayer('setMedia', {
      mp3: this.state.cuerrentMusicItem.file
    }).jPlayer('play');
  }

  playNext(type = 'next') {
    let index = this.findMusicIndex(this.state.cuerrentMusicItem);
    let newIndex = null;
    let musicListLength = this.state.musicList.length;
    if (type === 'next') {
      newIndex = (index + 1) % musicListLength;
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength;
    }
    this.setState({
      cuerrentMusicItem: this.state.musicList[newIndex]
    });
    this.playMusic();
  }

  findMusicIndex(musicItem) {
    return this.state.musicList.indexOf(musicItem);
  }

  componentDidMount() {

    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });

    this.playMusic(this.state.cuerrentMusicItem);

    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext();
    });

    Pubsub.subscribe('CHOOSE_MUSIC', (msg, musicItem) => {
      this.setState({
        cuerrentMusicItem: musicItem
      });
      this.playMusic();
    });

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter( item => musicItem !== item)
      });
      this.playNext('next');
    });

    Pubsub.subscribe('PREV_MUSIC', (msg) => {
      this.playNext('prev');
    });

    Pubsub.subscribe('NEXT_MUSIC', (msg) => {
      this.playNext('next');
    });

  }

  componentWillUnMount() {
    Pubsub.unSubscribe('CHOOSE_MUSIC');
    Pubsub.unSubscribe('DELETE_MUSIC');
    $('#player').unbind($.jPlayer.event.ended);
    Pubsub.unSubscribe('PREV_MUSIC');
    Pubsub.unSubscribe('NEXT_MUSIC');
  }

  render() {

    const Home = () => (
      <Player
        cuerrentMusicItem={this.state.cuerrentMusicItem}
      />
    );

    const List = () => (
      <MusicList
        cuerrentMusicItem={this.state.cuerrentMusicItem}
        musicList={this.state.musicList}
      />
    );

    return (
      <Router>
        <div>
          <Header/>

          <Route exact path="/" component={Home}/>
          <Route path="/list" component={List}/>

        </div>
      </Router>
    );
  }
}

export default Root;
