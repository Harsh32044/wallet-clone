import { useNavigate } from "react-router-dom";

export default function Homepage() {

    const navigate  = useNavigate()
  return (
    <>
      <nav className="flex justify-between items-center p-4 shadow-sm">
        <div className="font-bold text-3xl text-blue-500">Payment</div>
        <div className="flex items-center">
          <button type="button" onClick={() => navigate("/signup")} className="bg-blue-500 text-gray-200 rounded-md px-4 py-2 mr-6 hover:bg-blue-400">
            Sign up
          </button>
          <button type="button" onClick={() => navigate("/signin")} className="bg-gray-400 rounded-md px-4 py-2">
            Sign in
          </button>
        </div>
      </nav>

      <main>
        <div className="bg-blue-500 text-center h-[50vh] p-4 flex flex-col justify-between">
            <div className="text-6xl font-extrabold text-gray-50">Lightning fast payments, easy-peezy</div>
            <div>
            <button type="button" onClick={() => navigate("/signup")} className="text-gray-200 rounded-md px-4 py-2 mr-6 hover:bg-blue-600">
            Sign up
          </button>
          <button type="button" onClick={() => navigate("/signin")} className="text-gray-200 rounded-md px-4 py-2 hover:bg-blue-600">
            Sign in
          </button>
            </div>
        </div>
      </main>
    </>
  );
}
