import { useNavigate } from "react-router-dom";
import { Tornado } from "lucide-react";
import shopease from "../../public/shopease.jpeg";
import invest from "../../public/invest.jpeg";
import secure from "../../public/secure.jpeg";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="scroll-smooth">
      <nav className="flex justify-between items-center p-4 shadow-sm">
        <div
          className="text-blue-500 flex items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
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

      <div>
        <div className="bg-blue-500 text-center min-h-80 p-4 flex flex-col justify-between">
          <div className="text-5xl font-bold text-gray-50 my-4">
            Lightning fast, 100% secure payments. We got you covered.
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-gray-950 bg-white rounded-md px-2 p-2 hover:bg-blue-600 hover:text-gray-50"
            >
              Sign up for free!
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="flex justify-center">
            <img
              src={shopease}
              alt="shop with ease"
              className="custom-image"
              loading="eager"
            />
          </div>
          <div className="flex justify-center">
            <img
              src={invest}
              alt="savings from tons of offers"
              className="custom-image"
              loading="eager"
            />
          </div>
          <div className="flex justify-center">
            <img
              src={secure}
              alt="fully-secure data"
              className="custom-image md:col-span-1"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
