import { Map, Stack }  from 'immutable';
import R from 'ramda';

let current;
let oldLevels;

class ViewModel {

  constructor(API){
    this.API = API;
  }

  async get(appState){
    let user = appState.get('user');
    let levels = appState.get('levels');
    let { type, model } = await this.API.get(levels.toJS());

    switch(type){
      case 'resource':
        current = {
          model: model,
          url: model.url
        }
        break;
      case 'checkpoint':
        current = {
          model: model,
          collection: model.resources
        }
        break;
      case 'waypoint':
        current = {
          model: model,
          collection: model.checkpoints
        }
        break;
      case 'waypoints':
        current = { collection: model };
        break;
    }

    return current;
  }

  checkDone({waypoint, checkpoint, resource}){
    if(!waypoint){
      waypoint = { id: current.model.id }
    }
    this.API.updateProp({waypoint, checkpoint, resource});
    return true;
  }

  setHighlight({waypoint, checkpoint, resource}, status){
    current.collection[waypoint.id - 1].checkpoints[checkpoint.id- 1].highlight = status;
  }

  update(propData){
    console.log(propData);
  }
}

export default ViewModel;
