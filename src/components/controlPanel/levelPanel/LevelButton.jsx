import React from 'react';
import Actions from '../../../actions/index';
import R from 'ramda';
import _ from 'lodash';

class LevelButton extends React.Component {

  setViewModel(selection){
    Actions.setViewModel(selection);
  }

  render() {
    let [level, value] = this.props.level;
    let classes = this.props.isActive ? `btn btn-${level} btn-is-active` : `btn btn-${level}`;
    let title = _.capitalize(level);
    let selection = { type: level };
    return (
      <button disabled={ !value }
        onClick={ this.setViewModel.bind(this, selection )}
        className={ classes }>
        { title }
      </button>
    )
  }
};

LevelButton.propTypes = {
  level: React.PropTypes.array.isRequired,
  isActive: React.PropTypes.bool
};

export default LevelButton;
