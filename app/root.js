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
      cuerrentMusicItem: MUSIC_LIST[0],
      cycleModel: 'cycle'
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
    switch(type) {
      case 'cycle':
        newIndex = (index + 1) % musicListLength;
        break;
      case 'once':
        newIndex = index;
        break;
      case 'random':
        newIndex = Math.round(Math.random() * musicListLength);
        break;
      case 'prev':
        newIndex = (index - 1 + musicListLength) % musicListLength;
        break;
      default:
        newIndex = (index + 1) % musicListLength;
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
      switch(this.state.cycleModel) {
        case 'cycle':
          this.playNext('cycle');
          break;
        case 'once':
          this.playNext('once');
          break;
        case 'random':
          this.playNext('random');
          break;
      }
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

    Pubsub.subscribe('CHANGE_CYCLE_MODEL', (msg) => {
      const MODEL = ['cycle', 'once', 'random'];
      let currentModel = MODEL.indexOf(this.state.cycleModel);
      let newModel = (currentModel + 1) % 3;
      this.setState({
        cycleModel: MODEL[newModel]
      });
    });
  }

  componentWillUnMount() {
    Pubsub.unSubscribe('CHOOSE_MUSIC');
    Pubsub.unSubscribe('DELETE_MUSIC');
    $('#player').unbind($.jPlayer.event.ended);
    Pubsub.unSubscribe('PREV_MUSIC');
    Pubsub.unSubscribe('NEXT_MUSIC');
    Pubsub.unSubscribe('CHANGE_CYCLE_MODEL');
  }

  render() {

    const Home = () => (
      <Player
        cycleModel={this.state.cycleModel}
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
