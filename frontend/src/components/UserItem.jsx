import { NameInitialsAvatar } from "react-name-initials-avatar";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");
export default function UserItem({ user }) {
  const [modalOpen, setModalOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: "400px",
    },
  };

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
      <button
        className="bg-blue-500 text-gray-100 hover:bg-blue-400 rounded-md p-2"
        onClick={() => setModalOpen(true)}
      >
        Send Money
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        bodyOpenClassName="modal-open"
        className="shadow-md absolute p-6"
      >
        <div className="flex flex-col">
          <div className="font-bold text-2xl text-center">Send Money</div>
          <div className="flex items-center my-4">
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
          <label htmlFor="txnAmount">Amount (in Rs.)</label>
          <input type="text" name="txnAmount" id="txnAmount" 
          placeholder="Enter Amount" className="p-2 my-4 border-2"/>
          <button className="bg-blue-500 text-gray-50 rounded-md h-10 hover:bg-blue-400">Initiate Transfer</button>
        </div>
      </Modal>
    </div>
  );
}
