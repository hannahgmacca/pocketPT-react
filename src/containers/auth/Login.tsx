import { Button, Container, Form, Row } from 'react-bootstrap';
import AuthAPI from '../../apis/AuthAPI';
import APIClient from '../../apis/APIClient';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../state/AppContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const apiClient = new APIClient();
  const authClient = new AuthAPI(apiClient);

  const handleLogin = async () => {
    try {
      const response = await authClient.login({ email, password });

      if (response) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        navigate('/');
      }
    } catch {
      alert('Login failed');
    }
  };

  return (
    <Container fluid className='d-flex justify-content-center align-items-center mb-3' style={{ height: '100vh' }}>
      <Form className='w-75'>
        <Row>
          <svg
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            viewBox='0 0 512 512'
            xmlSpace='preserve'
            width='212'
            height='212'
          >
            <g fill='none' stroke='#ffffff' strokeWidth='10' strokeMiterlimit='10'>
              {/* Barbell */}
              <line x1='100' y1='50' x2='412' y2='50' strokeWidth='12' stroke='#ffffff' />
              <rect x='90' y='30' width='20' height='40' fill='#ffffff' />
              <rect x='402' y='30' width='20' height='40' fill='#ffffff' />

              {/* Man's head */}
              <circle cx='256' cy='100' r='20' fill='none' stroke='#ffffff' strokeWidth='8' />

              {/* Man's body */}
              <line x1='256' y1='120' x2='256' y2='200' stroke='#ffffff' strokeWidth='8' />

              {/* Man's muscular arms holding barbell */}
              <path d='M256,130 Q240,90 212,50' stroke='#ffffff' strokeWidth='8' fill='none' />
              <path d='M256,130 Q272,90 300,50' stroke='#ffffff' strokeWidth='8' fill='none' />

              {/* Man's muscular legs */}
              <path d='M256,200 Q230,250 220,300' stroke='#ffffff' strokeWidth='8' fill='none' />
              <path d='M256,200 Q282,250 292,300' stroke='#ffffff' strokeWidth='8' fill='none' />

              {/* Man's feet */}
              <line x1='220' y1='300' x2='190' y2='300' stroke='#ffffff' strokeWidth='8' />
              <line x1='292' y1='300' x2='322' y2='300' stroke='#ffffff' strokeWidth='8' />
            </g>
          </svg>
        </Row>

        <h3 className='mb-4'>Login</h3>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          className='mb-3'
        />
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          className='mb-3'
        />
        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
