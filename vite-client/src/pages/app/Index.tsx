import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

type Props = {};

export default function Index({}: Props) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.status === 200) {
        navigate('/authentication/login');
      }
    } catch (error) {}
  };
  return (
    <div>
      Index Page
      <Button onClick={handleLogout} type="default">
        Log out
      </Button>
    </div>
  );
}
