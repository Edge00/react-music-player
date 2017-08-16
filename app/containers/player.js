import React, {Component} from 'react';
import Progress from '../components/progress';
import { Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';
import './player.scss';

let musicDuration = null;

class Player extends Component {

  constructor(props) {
    super(props),
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      leftTime: ''
    },
    this.setProgress = this.setProgress.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.play = this.play.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  setProgress(pgs) {
    $('#player').jPlayer(this.state.isPlay ? 'play' : 'pause', musicDuration * pgs);
  }

  setVolume(pgs) {
    $('#player').jPlayer('volume', pgs);
  }

  play() {
    $('#player').jPlayer(this.state.isPlay ? 'pause' : 'play');
    this.setState({ isPlay: !this.state.isPlay});
  }

  prev() {
    Pubsub.publish('PREV_MUSIC');
  }

  next() {
    Pubsub.publish('NEXT_MUSIC');
  }

  formatTime(time) {
    time = Math.floor(time);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  }

  componentDidMount() {

    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      musicDuration = e.jPlayer.status.duration;
      this.setState({
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime: this.formatTime(musicDuration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
      });
    });

  }

  render() {
    return (
      <div className="container-player">
        <h1 className="caption">
          <Link to="/list">我的私人音乐坊 &gt;</Link>
        </h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">
              {this.props.cuerrentMusicItem.title}
            </h2>
            <h3 className="music-artist mt10">
              {this.props.cuerrentMusicItem.artist}
            </h3>
            <div className="row mt20">
              <div className="left-time -col-auto">-{this.state.leftTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{
                  top: 5,
                  left: -5
                }}></i>
                <div className="volume-wrapper">
                  <Progress
                    progress={this.state.volume}
                    setProgress={this.setVolume}
                    barColor='red'
                  />
                </div>
              </div>
            </div>
            <div style={{
              height: 10,
              lineHeight: '10px',
              marginTop: '20px'
            }}>
              <Progress
                progress={this.state.progress}
                setProgress={this.setProgress}
                barColor='green'
              />
            </div>
            <div className="mt35 row">
              <div>
                <i onClick={this.prev} className="icon prev"></i>
                <i
                  onClick={this.play}
                  className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                >
                </i>
                <i onClick={this.next} className="icon next ml20"></i>
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle"></i>
                {/* once random cycle */}
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img
              src={this.props.cuerrentMusicItem.cover}
              alt={this.props.cuerrentMusicItem.title}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
