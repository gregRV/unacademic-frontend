import React from 'react';
import Actions from '../../actions/index.js';

class CardNav extends React.Component {

  setViewModel(selection){
    Actions.setViewModel(selection);
  }

  render(){
    let { type, title, id } = this.props.model;
    let selection = { type, title, id };
    return (
      <nav className="card_nav">
        <button onClick={ this.setViewModel.bind(this, selection)} className="btn btn-inverse browse">
          Browse
        </button>
      </nav>
    )
  }
}

CardNav.propTypes = {
  model: React.PropTypes.object.isRequired
}


export default CardNav;
