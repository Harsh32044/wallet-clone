import { useState } from "react";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import UserItem from "../components/UserItem";

export default function Dashboard() {
  const [user, setUser] = useState({
    firstName: "Harsh",
    lastName: "Srivastav",
    balance: "24020.229323",
  });

  const [users, setUsers] = useState([
    {
      firstName: "User",
      lastName: "One",
    },
    {
      firstName: "Adam",
      lastName: "Two",
    },
    {
      firstName: "Eve",
      lastName: "Three",
    },
  ]);

  const amountFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return (
    <>
      <header>
        <nav className="shadow-md flex justify-between items-center p-4">
          <div className="text-2xl font-bold">Payments App</div>
          <div className="flex items-center">
            <div className="text-md pr-2">Hello, {user.firstName}</div>
            <div className="cursor-pointer">
              <NameInitialsAvatar
                bgColor="whitesmoke"
                textColor="gray"
                borderWidth="0"
                name={`${user.firstName} ${user.lastName}`}
              />
            </div>
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

        {
            users.length != 0 ?
            (
                <ul className="py-6">
                    {users.map((elem, index) => <li><UserItem user={elem} key={index}/></li>)}
                </ul>
            ) : <h1>Loading...</h1>
        }
      </main>
    </>
  );
}
