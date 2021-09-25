export const generatePathForStatic = () => {
    return process.env.API_PORT
        ? `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}:${process.env.API_PORT}`
        : `${process.env.API_PROTOCOL}://${process.env.API_HOSTNAME}`;
}