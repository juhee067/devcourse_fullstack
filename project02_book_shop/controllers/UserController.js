import pool from '../db.js';
import { StatusCodes } from 'http-status-codes';
import userService from '../services/userService.js';

const signup = async (req, res) => {
  try {
    const result = await userService.signup(sql, userData);

    if (result.affectedRows) {
      return res.status(StatusCodes.CREATED).json({ msg: '회원가입이 완료되었습니다.' });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: '회원가입이 실패했습니다' });
  } catch (error) {
    res.status(500).json({ msg: '회원가입 중에 문제가 발생했습니다.' });
  }
};

const signin = async (req, res) => {
  try {
    const results = await userService.verifyUser(req, res);
    const user = results[0];

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: 401, msg: `아이디와 비번을 다시 확인해주세요` });
    }

    const hashPwd = userService.hashPassword(req, user.salt);
    if (user.password === hashPwd) {
      const token = generateToken(user.id, user.email, user.password);
      res.cookie('token', token, { httpOnly: true });
      return res.status(StatusCodes.OK).json({ ...user, token: token });
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: 401, msg: `아이디와 비번을 다시 확인해주세요` });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: '로그인 중에 문제가 발생했습니다.' });
  }
};

const reqPasswordReset = async (req, res) => {
  try {
    const userData = await userService.reqPasswordReset(req, res);

    if (userData) {
      return res
        .status(StatusCodes.OK)
        .json({ email: userData.email, msg: '비밀번호 초기화가 요청됐습니다.' });
    }
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: '비밀번호 초기화 요청에 실패 했습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: '비밀번호 초기화 요청 중에 문제가 발생했습니다.' });
  }
};

const passwordReset = async (req, res) => {
  console.log('a');
  try {
    const value = await userService.passwordReset(req, res);

    if (value.affectedRows === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: '해당 유저가 존재하지않습니다.' });
    }
    res.status(StatusCodes.OK).json({ msg: '비밀번호가 초기화됐습니다.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: '비밀번호 초기화 중에 문제가 발생했습니다.' });
  }
};

export { signup, signin, reqPasswordReset, passwordReset };
