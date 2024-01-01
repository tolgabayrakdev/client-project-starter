import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function AuthWrapper(WrapperComponent: any) {
  const Wrapper = (props: any) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sessionExpired, setSessionExpired] = useState(false);
    const [accessDenied, setAccessDenied] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      const verifyAuthToken = async () => {
        try {
          const res = await fetch('http://localhost:8000/api/v1/auth/verify', {
            method: 'POST',
            credentials: 'include',
          });
          if (res.status === 200) {
            setLoading(false);
            setLoggedIn(true);
          } else if (res.status === 401) {
            setLoading(false);
            setSessionExpired(true);
          } else if (res.status == 403) {
            setLoading(false);
            setAccessDenied(true);
          }
        } catch (error) {
          setLoading(false);
          setAccessDenied(true);
        }
      };
      verifyAuthToken();
    }, []);

    const extendSession = async () => {
      try {
        const res = await fetch(
          'http://localhost:8000/api/v1/auth/refresh_token',
          {
            method: 'POST',
            credentials: 'include',
          },
        );
        if (res.status === 200) {
          setLoggedIn(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (loading) {
      return <Loading />;
    } else if (accessDenied) {
      return (
        <section className="flex flex-col h-screen justify-center items-center text-xl text-red-600">
          Access denied!{' '}
          <Link className=" hover:underline text-blue-600 text-sm" to="/">
            Go home
          </Link>{' '}
        </section>
      );
    } else if (sessionExpired) {
      return (
        <section className="flex h-screen flex-col justify-center items-center text-xl">
          Sorry, your session has expired.
          <Button
            className="mt-1 text-green-600"
            onClick={extendSession}
            type="default"
          >
            Extend your session
          </Button>
          <Button
            className="mt-1 w-40 text-green-600"
            type="default"
            onClick={() => navigate('/authentication/login')}
          >
            {' '}
            Go to login page
          </Button>
        </section>
      );
    }
    return (
      <section>
        <WrapperComponent loggedIn={loggedIn} {...props} />
      </section>
    );
  };
  return Wrapper;
}

export default AuthWrapper;
