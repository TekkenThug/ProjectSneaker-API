import { check, validationResult } from "express-validator";

const PASSWORD_REGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

const validate = async (validations, req, res, next) => {
  for (let validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: errors.array() });
};

export const isNewUser = async (req, res, next) => {
  await validate([
    check('email').isEmail(),
    check('nickname').exists(),
    check('password').matches(PASSWORD_REGEX),
    check('repeatPassword').equals(req.body.repeatPassword)
  ], req, res, next);
}

