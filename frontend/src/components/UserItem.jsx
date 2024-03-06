import { NameInitialsAvatar } from "react-name-initials-avatar";

export default function UserItem({ user }) {
  return (
    <div className="flex justify-between items-center py-4 rounded-md cursor-pointer px-4 hover:bg-gray-200">
      <div className="flex items-center">
        <NameInitialsAvatar
          bgColor="whitesmoke"
          textColor="gray"
          borderWidth="0"
          name={`${user.firstName} ${user.lastName}`}
        />
        <div className="font-semibold ml-4">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <button className="bg-gray-900 text-gray-200 hover:bg-gray-700 rounded-md p-2">
        Send Money
      </button>
    </div>
  );
}
