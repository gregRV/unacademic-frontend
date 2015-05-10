import { Map, Stack }  from 'immutable';
import R from 'ramda';

class ViewModel {

  constructor(api){
    this.api = api;
  }

  async get(appState){
    let { user, levels } = appState;
    let waypoints = await this.api();
    let waypointId = levels.waypoint && levels.waypoint.id;
    let waypoint = R.find(R.propEq('id', waypointId), waypoints);
    let checkpointId = levels.checkpoint && levels.checkpoint.id;
    let checkpoint =  waypoint && R.find(R.propEq('id', checkpointId), waypoint.checkpoints);

    if(checkpoint){
      return {
        model: checkpoint,
        collection: checkpoint.resources
      }
    }

    if(waypoint){
      return {
        model: waypoint,
        collection: waypoint.checkpoints
      }
    }

    if(waypoints){
      let title = '_Unacademic';
      let type = 'waypoints';
      let model = { title, type };
      let collection = user ? [waypoints[1], waypoints[2]] : waypoints;
      return { model, collection }
    }
  }

  set({ current, selection }){
    let { type, id, title } = selection;
    let proposal;

    switch(type){
      case 'waypoints':
        proposal = {
          waypoints: { id, title } || current['waypoints'],
          waypoint: false,
          checkpoint: false
        }
        break;
      case 'waypoint':
        proposal = {
          waypoints: current['waypoints'],
          waypoint: { id, title  } || current['waypoint'],
          checkpoint: false
        }
        break;
      case 'checkpoint':
        proposal = {
          waypoints: current['waypoints'],
          waypoint: current['waypoint'],
          checkpoint: { id, title } || current['checkpoint']
        }
        break;
    }
    return proposal;
  }

  update(propData){
    console.log(propData);
  }
}

export default ViewModel;
