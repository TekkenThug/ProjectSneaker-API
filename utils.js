export const generatePath = () => {
    return process.env.API_PORT
        ? `${process.env.API_HOSTNAME}:${process.env.API_PORT}`
        : process.env.API_HOSTNAME;
}