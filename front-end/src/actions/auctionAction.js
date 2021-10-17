export const setAuction = (auction) => {
  return {
    type: "SET_AUCTION",
    payload: auction,
  };
};
export const setItem = (item) => {
  return {
    type: "SET_ITEM",
    payload: item,
  };
};
export const setBid = (bid) => {
  return {
    type: "SET_LAST_BID",
    payload: bid,
  };
};