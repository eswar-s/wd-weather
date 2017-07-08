export function weathers (state: any = [], {type, payload}) {
  switch (type) {
    case 'ADD_WEATHERS':
      return payload;
    case 'CREATE_WEATHER':
      return [...state.filter(weather => {
        return weather.location.city !== payload.location.city;
      }), payload]
    case 'UPDATE_WEATHER':
      return state.map(weather => {
        return weather.location.city === payload.location.city ? Object.assign({}, weather, payload) : weather;
      });
    case 'DELETE_WEATHER':
      return state.filter(weather => {
        return weather.location.city !== payload.location.city;
      });
    default:
      return state;
  }
};
