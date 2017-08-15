import React, {Component} from 'react';
import './progress.scss';

class Progress extends Component {

  constructor(props) {
    super(props);
    this.setProgress = this.setProgress.bind(this);
  }

  setProgress(e) {
    let settedProgress = (e.pageX - this.refs.propgressBar.getBoundingClientRect().left) / this.refs.propgressBar.clientWidth;
    this.props.setProgress(settedProgress);
  }

  render() {
    let barStyle = {
      width: `${this.props.progress}%`,
      background: this.props.barColor
    };

    return (
      <div
        ref="propgressBar"
        onClick={this.setProgress}
        className="components-progress"
      >
        <div className="progress" style={barStyle}></div>
      </div>
    );
  }
}

// const Progress = (props) => {
//
//   console.log(this.findDOMNode);
//
//   const setProgress = (e) => {
//     let settedProgress = (e.pageX - this.refs.propgressBar.getBoundingClientRect().left) / this.refs.propgressBar.clientWidth;
//     this.props.setProgress(settedProgress);
//   };
//
//   let barStyle = {
//     width: `${this.props.progress}%`,
//     background: this.props.barColor
//   };
//
//   return (
//     <div onClick={setProgress} ref="propgressBar" className="components-progress">
//       <div className="progress" style={barStyle}></div>
//     </div>
//   );
//
// }

export default Progress;
