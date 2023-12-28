import { Card } from "antd"
import { Button, Form, Input } from 'antd';
import { Link } from "react-router-dom";

type Props = {}

export default function Register({ }: Props) {


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <div>
            <h4 className="text-center text-xl mb-1">Register here</h4>
            <Card className="bg-gray-50" style={{ width: 400, height: 280, }}>
                <Form
                    onFinish={onFinish}
                >

                    <Form.Item
                        name="username"
                        hasFeedback
                        rules={[
                            {
                                type: "string",
                                message: "The input is not valid username!"
                            },
                            {
                                required: true,
                                message: "Please input your username!"
                            }
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        hasFeedback
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid email!"
                            },
                            {
                                required: true,
                                message: "Please input your email!"
                            }
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
                                message: "Please input your password!",
                                min: 6
                            }
                        ]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item className="mb-4">
                        <Link className="hover:underline text-blue-500" to="/authentication/login" >
                            Already have an account?
                        </Link>
                    </Form.Item>
                    <Form.Item>
                        <Button className="w-full" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}