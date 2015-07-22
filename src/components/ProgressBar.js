import React, {PropTypes} from 'react';
import classnames from 'classnames';

const INDETERMINATE_CLASS = 'mdl-progress__indeterminate';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upgraded: false,
    };
  }

  render() {
    let mainClassString = classnames('mdl-progress mdl-js-progress progress-demo', {
      'is-upgraded': this.state.upgraded,
      'mdl-progress__indeterminate': !!this.props.indeterminate,
    });
    let progress = this.props.progress;
    let buffer = parseInt(this.props.buffer, 10);
    if (!!this.props.indeterminate) {
      progress = 0;
      buffer = 100;
    }
    return (
      <div style={this.props.style} className={mainClassString}>
        <div className="progressbar bar bar1" style={{width: progress + '%'}}></div>
        <div className="bufferbar bar bar2" style={{width: buffer + '%'}}></div>
        <div className="auxbar bar bar3" style={{width: buffer + '%'}}></div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      upgraded: true,
    });
  }
}

ProgressBar.PropTypes = {
  progress: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  buffer: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  indeterminate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  style: PropTypes.object,
};

ProgressBar.defaultProps = {
  progress: 0,
  buffer: 0,
  indeterminate: false,
  style: {},
};

export default ProgressBar;
