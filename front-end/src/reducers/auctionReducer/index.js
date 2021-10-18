const initialState = {
  auction: {},
  item: {},
  lastBid: {},
};

const auctionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_AUCTION":
      return {
        ...state,
        auction: payload,
      };
    case "SET_ITEM":
      return { ...state, item: payload };
    case "SET_LAST_BID":
      return { ...state, lastBid: payload };
    default:
      return state;
  }
};

export default auctionReducer;
