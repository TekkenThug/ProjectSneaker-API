export const generatePathForStatic = () => {
    return process.env.API_PORT
        ? `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}:${process.env.API_PORT}`
        : `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}`;
}

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
 * @param {array} sneakers
 * @returns {array}
 */
export const prepareImageLink = (sneakers) => {
    sneakers.forEach(pair => {
        pair['picture'] = `${generatePathForStatic()}/${pair['picture']}`;
    });

    return sneakers;
}

/**
 * Returned array, where id field is converted ObjectID (from MongoDB)
 *
 * @param {array} items - items for adding id
 * @returns {array} Array with id fields
 */
export const serializeObjectId = (items) => {
    return items.map((obj) => ({ ...obj.toJSON(), id: obj._id.toString()}));
}