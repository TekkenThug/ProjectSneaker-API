export const generatePathForStatic = () => {
  return process.env.API_PORT
    ? `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}:${process.env.API_PORT}`
    : `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}`;
};

/**
 * Returns formatted date
 *
 * @param {string} date - initial string date
 * @param {object} options - options for formatting
 * @returns {string} formatted date in string
 */
export const formatDate = (date, options = {}) => {
  return new Date(date).toLocaleDateString('ru-RU', options);
};

/**
 * Returns sneakers pairs with full image path
 *
 * @param {Array} sneakers - pairs for creating image paths
 * @returns {Array} - pairs with image path
 */
export const prepareImageLink = (sneakers) => {
  sneakers.forEach((pair) => {
    pair.picture = `${generatePathForStatic()}/${pair.picture}`;
  });

  return sneakers;
};

/**
 * Returned array, where id field is converted ObjectID (from MongoDB)
 *
 * @param {Array} items - items for adding id
 * @returns {Array} Array with id fields
 */
export const serializeObjectId = (items) => {
  // eslint-disable-next-line no-underscore-dangle
  return items.map((obj) => ({ ...obj.toJSON(), id: obj._id.toString() }));
};
