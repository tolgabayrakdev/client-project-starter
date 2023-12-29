import { Card } from 'antd';
import { Button, Form, Input } from 'antd';

type Props = {};

export default function ResetPassword({}: Props) {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <h4 className="text-center text-xl mb-1">Forget password ?</h4>
      <Card className="bg-gray-50" style={{ width: 400, height: 135 }}>
        <Form onFinish={onFinish}>
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
          <Form.Item>
            <Button className="w-full" htmlType="submit">
              Send a reset password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
