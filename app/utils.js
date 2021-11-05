import { v4 as uuid } from 'uuid';

/**
 * Return path to the static resources
 * on the server
 * @returns {string} path to the static
 */
export const generatePathForStatic = () => {
  return process.env.API_PORT
    ? `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}:${process.env.API_PORT}`
    : `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}`;
};

/**
 * Returns unique name
 * @returns {string} unique name
 */
export const generateUniqueName = () => {
  return `${new Date().getTime()}${uuid()}`;
};

/**
 * Returns formatted date
 * @param {string} date - initial string date
 * @param {object} options - options for formatting
 * @returns {string} formatted date in string
 */
export const formatDate = (date, options = {}) => {
  return new Date(date).toLocaleDateString('ru-RU', options);
};

/**
 * Returns data with full image path
 * @param {Array | object} data - pairs for creating image paths
 * @param {string} key - image key into data
 * @returns {Array | object} - pairs with image path
 */
export const prepareImageLink = (data, key = 'picture') => {
  if (data instanceof Array) {
    data.forEach((pair) => {
      pair[key] = `${generatePathForStatic()}/${pair[key]}`;
    });

    return data;
  }

  data[key] = `${generatePathForStatic()}/${data[key]}`;

  return data;
};

/**
 * Returned array, where id field is converted ObjectID (from MongoDB)
 * @param {Array} items - items for adding id
 * @returns {Array} Array with id fields
 */
export const serializeObjectId = (items) => {
  // eslint-disable-next-line no-underscore-dangle
  return items.map((obj) => ({ ...obj.toJSON(), id: obj._id.toString() }));
};
