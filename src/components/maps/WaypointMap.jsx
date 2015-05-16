import React from 'react';
import R from 'ramda';
import Stop from './Stop.jsx';

class WaypointMap extends React.Component {
  constructor(){
    this.state = {
      height: 245,
      width: 418,
      padding: 30,
      radius: 5
    }
  }
  handleEnter(){
    this.setState({radius: 20});
  }

  handleLeave(){
    this.setState({radius: 10});
  }

  render() {
    let { height, width, radius, padding } = this.state;
    let { checkpoints } = this.props.model;
    let baseLine = height - (padding);
    let interval = ((width - padding * 2) / (checkpoints.length - 1));

    let drawStops = R.mapIndexed((checkpoint, index) => {
      let x = padding + (index * interval);
      let y = baseLine;
      let title = checkpoint.title;
      let params = { x, y, radius, title }
      return <Stop key={ index } params={ params }/>
    });

    return (
      <svg width={ width } height={ height } className="map">
        <line className="line"
          x1={ padding }
          y1={ baseLine }
          x2={ width - padding }
          y2={ baseLine }
          strokeWidth="3"/>
        { drawStops(checkpoints) }
      </svg>
    )
  }
};

WaypointMap.propTypes = {
  model: React.PropTypes.object
}

export default WaypointMap;