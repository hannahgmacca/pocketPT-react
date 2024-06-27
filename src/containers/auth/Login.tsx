import { Button, Container, Form } from 'react-bootstrap';
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
      const response = await authClient.login({email, password})
  
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
    <Container fluid className='d-flex justify-content-center align-items-center mb-3' style={{height: '100vh'}}>
      <Form className='w-75'>
        <h1 className="mb-4">Login</h1>
        <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required className="mb-3" size="lg"/>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          className="mb-3"
          size="lg"
        />
        <Button onClick={handleLogin}>Login</Button>
        </Form>
    </Container>
  );
};

export default LoginPage;
