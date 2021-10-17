import Sneaker from "../../models/Sneaker.js";

const getNotApprovedSneakers = async () => {
  return Sneaker.find({
    isApproved: false,
  });
}

export default {
  getNotApprovedSneakers,
}