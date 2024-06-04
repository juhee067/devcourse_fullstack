import jwt from 'jsonwebtoken';

const ensureAuthorization = (req) => {
  try {
    const receivedJwt = req.headers['authorization'];
    if (receivedJwt) {
      return jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    }
    throw new ReferenceError('jwt must be provided');
  } catch (err) {
    console.log(err.name, err.message);
    return err;
  }
};

export { ensureAuthorization };
