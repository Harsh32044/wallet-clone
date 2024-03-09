import { useEffect, useState } from "react";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import UserItem from "../components/UserItem";
import { nanoid } from "nanoid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Tornado } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState({
    firstName: "X",
    lastName: "Y",
    balance: "0",
  });
  const [users, setUsers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  async function fetchAvailableUsers() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/bulk",
        { headers }
      );
      setUsers(response.data.users);
    } catch (err) {
      navigate("/signin");
    }
  }

  async function getCurrentUserData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/userData",
        {
          headers,
        }
      );
      const balanceResponse = await axios.get(
        "http://localhost:3000/api/v1/accounts/balance",
        { headers, }
      );
      setUser({
        ...user,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        balance: balanceResponse.data.balance
      });
    } catch (err) {
      navigate("/signin");
    }
  }

  const handleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSignout = () => {
    localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    getCurrentUserData();
    fetchAvailableUsers();
  }, []);

  const amountFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return (
    <>
      <header>
        <nav className="shadow-md flex justify-between items-center p-4">
          <div className="text-blue-500 flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="text-2xl font-bold">Payzard</div>
          <Tornado />
          </div>
          <div className="flex items-center">
            <div className="text-md pr-2">Hello, {user.firstName}</div>
            <div className="cursor-pointer" onClick={handleExpanded}>
              <NameInitialsAvatar
                bgColor="whitesmoke"
                textColor="gray"
                borderWidth="0"
                name={`${user.firstName} ${user.lastName}`}
              />
            </div>
            {isExpanded && (
              <div className="side-menu">
                {/* <button onClick={() => }>
                  Profile
                </button> */}
                <button onClick={() => handleSignout()}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="">
        <div className="my-4 font-semibold text-md px-4">
          Your Balance: {amountFormatter.format(user.balance)}
        </div>
        <div className="text-xl font-bold mb-4 px-4">Users</div>
        <input
          type="search"
          name="usersearch"
          id="usersearch"
          placeholder="Search Users..."
          className="p-4 w-full border-2"
        />

        {users.length != 0 ? (
          <ul className="py-6">
            {users.map((elem) => (
              <li key={nanoid()}>
                <UserItem user={elem} getCurrentUserBalance={getCurrentUserData}/>
              </li>
            ))}
          </ul>
        ) : (
          <div className="font-bold text-center mt-8">Loading...</div>
        )}
      </main>
    </>
  );
}
