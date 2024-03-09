import { useNavigate } from "react-router-dom";
import { Tornado } from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between items-center p-4 shadow-sm">
        <div className="text-blue-500 flex items-center">
          <div className="text-2xl font-bold">Payzard</div>
          <Tornado />
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-gray-200 rounded-md px-4 py-2 mr-6 hover:bg-blue-400"
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="bg-gray-200 rounded-md px-4 py-2 hover:bg-gray-400"
          >
            Sign in
          </button>
        </div>
      </nav>

      <main>
        <div className="bg-blue-500 text-center h-80 p-4 flex flex-col justify-between">
          <div className="text-5xl font-extrabold text-gray-50">
            Lightning fast, 100% secure payments. We got you covered.
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-gray-950 bg-white  rounded-md px-4 py-2 mr-6 hover:bg-blue-600 hover:text-gray-50"
            >
              Sign up for free!
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
