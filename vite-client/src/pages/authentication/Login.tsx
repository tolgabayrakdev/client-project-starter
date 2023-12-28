import { Card } from "antd"
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";



export default function Login() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const loginErrorMessage = () => {
        messageApi.open({
            type: 'error',
            content: "We're sorry, you can't log in",
        });
    }


    const onFinish = async (values: { email: string, password: string }) => {
        try {
            const res = await fetch("http://localhost:8000/api/v1/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email: values.email, password: values.password })
            })
            if (res.status === 200) {
                navigate("/app")
            } else {
                loginErrorMessage();
            }
        } catch (error) {
            loginErrorMessage();
        }
    };
    return (
        <div>
            {contextHolder}
            <h4 className="text-center text-xl mb-1">Login here</h4>
            <Card className="bg-gray-50" style={{ width: 400, height: 230, }}>
                <Form
                    onFinish={onFinish}
                >
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
                    <Form.Item className="mb-4 flex">
                        <Link className="hover:underline text-blue-500" to="/authentication/register" >
                            Don't you have an account?
                        </Link>
                        <Link className="hover:underline text-blue-500 ml-12" to="/authentication/reset_password" >
                            Forget password ?
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