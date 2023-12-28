import { Spin } from "antd";


export default function Loading() {
    return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
            <Spin size="large" />
        </div>
    )
}