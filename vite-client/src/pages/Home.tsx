import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Link className="text-blue-500 hover:underline" to="authentication/login">
        go login page
      </Link>
    </div>
  );
}
