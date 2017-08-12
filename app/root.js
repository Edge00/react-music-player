import React, {Component} from 'react';
import Header from './components/header';
import Player from './containers/player';
import MusicList from './containers/musicList';

import {
 BrowserRouter as Router,
 Route,
 Link
} from 'react-router-dom';

import { MUSIC_LIST } from './config/musiclist';




class Root extends Component {

  constructor(props) {
    super(props),
    this.state = {
      musicList: MUSIC_LIST,
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

    const Home = () => (
      <Player cuerrentMusicItem={this.state.cuerrentMusicItem}/>
    )

    const List = () => (
      <MusicList
        cuerrentMusicItem={this.state.cuerrentMusicItem}
        musicList={this.state.musicList}
      />
    )

    return (
      <Router>
        <div>
          <Header/>

          <nav>
            <h1><Link to="/">播放器</Link></h1>
            <h1><Link to="/list">音乐列表</Link></h1>
          </nav>

          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />

        </div>
      </Router>
    );
  }
}

export default Root;
