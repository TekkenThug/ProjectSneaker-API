import { check, validationResult } from "express-validator";

const PASSWORD_REGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

const validate = async (validations, data) => {
  for (let validation of validations) {
    const result = await validation.run(data);
    if (result.errors.length) break;
  }

  const errors = validationResult(data);
  if (errors.isEmpty()) {
    return true;
  }

  return errors.array()[0].msg;
};

export const isNewUser = async (data) => {
  return await validate([
    check('email').isEmail().withMessage('Email is not valid'),
    check('nickname').notEmpty().withMessage('Nickname is not exist'),
    check('password').matches(PASSWORD_REGEX).withMessage('Password is not regex'),
    check('repeatPassword').equals(data.body.password).withMessage('Password is not equal')
  ], data);
}

export default (rule) => {
  return async (req, res, next) => {
    const answer = await rule(req);
    return Array.isArray(answer) ? res.status(400).json(answer) : next()
  }
}


