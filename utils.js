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