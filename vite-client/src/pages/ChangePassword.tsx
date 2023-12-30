import { Button, Card, Form, Input } from "antd"
import { useEffect, useState } from "react";

type Props = {}

export default function ChangePassword({ }: Props) {
  const [isToken, setIsToken] = useState(false);
  console.log(window.location.pathname.split("/")[2]);

  const onFinish = async (values: { password: string }) => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          password: values.password,
        }),
      });
      if (res.status === 200) {

      }

    } catch (error) {
    }
  };

  useEffect(() => {

  }, [])

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <h4 className="text-center text-xl mb-1">Change password here</h4>
      <Card className="bg-gray-50" style={{ width: 400, height: 130 }}>
        <Form onFinish={onFinish}>

          <Form.Item
            className="mb-3"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
                min: 6,
              },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}