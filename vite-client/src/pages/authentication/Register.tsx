import { Card } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const registerAlredyUsedError = () => {
    messageApi.open({
      type: 'error',
      content: 'Username or email already used!',
    });
  };

  const loginSuccessfulMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Username or email already used!',
    });
  };

  const onFinish = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });
      if (res.status === 201) {
        loginSuccessfulMessage();
        navigate('/authentication/login');
      } else if (res.status === 500) {
        registerAlredyUsedError();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {contextHolder}
      <h4 className="text-center text-xl mb-1">Register here</h4>
      <Card className="bg-gray-50" style={{ width: 400, height: 280 }}>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            hasFeedback
            rules={[
              {
                type: 'string',
                message: 'The input is not valid username!',
              },
              {
                required: true,
                message: 'Please input your username!',
                min: 3,
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: 'The input is not valid email!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            className="mb-3"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your password!',
                min: 6,
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item className="mb-4">
            <Link
              className="hover:underline text-blue-500"
              to="/authentication/login"
            >
              Already have an account?
            </Link>
          </Form.Item>
          <Form.Item>
            <Button className="w-full" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
