import styled from 'styled-components';
import { Title } from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState(''); // useState 훅을 사용하여 이메일 상태를 초기화합니다.
  const [password, setPassword] = useState(''); // useState 훅을 사용하여 비밀번호 상태를 초기화합니다.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 제출 동작을 막습니다.
    console.log(email, password); // 이메일과 비밀번호를 콘솔에 출력합니다.
  };
  return (
    <div>
      <Title size='large'>회원가입</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <InputText
              placeholder='이메일'
              inputType='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <InputText
              placeholder='비밀번호'
              inputType='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Button type='submit' size='medium' scheme='primary'>
              회원가입
            </Button>
          </fieldset>
          <div className='info'>
            <Link to='/reset'>비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </div>
  );
}

const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;

    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup;
