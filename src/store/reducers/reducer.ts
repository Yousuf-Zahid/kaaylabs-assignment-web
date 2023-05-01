  const initialState = {
    loading: false,
    beers: [],
  };
  
  const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_FETCHED_BEERS':
            return {
                ...state,
                loading: false,
                beers: action.payload
            };
        default:
            return state;
        }
}            

export default Reducer