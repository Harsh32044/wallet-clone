import { NameInitialsAvatar } from "react-name-initials-avatar";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

Modal.setAppElement("#root");
export default function UserItem({ user, getCurrentUserBalance }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [txnAmount, setTxnAmount] = useState(0)
  const [status, setStatus] = useState("")

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

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleFundTransfer = async () => {
    const reqBody = {
      to: user._id,
      amount: txnAmount
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/accounts/transfer", reqBody, { headers })
      console.log(response)
      setStatus(response.data.message)
    }
    catch (err) {
      setStatus(err.response.data.error)
    }
  }

  const handleChange = (event) => {
    setTxnAmount(event.target.value);
  }

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
        onRequestClose={() => {
          setStatus('')
          setModalOpen(false)
          setTxnAmount(0)
          getCurrentUserBalance()
        }}
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
          {status.length != 0 && <p className="text-red-500 font-semibold">{status}</p>}
          <label htmlFor="txnAmount">Amount (in Rs.)</label>
          <input type="text" name="txnAmount" id="txnAmount" value={txnAmount}
          placeholder="Enter Amount" className="p-2 my-4 border-2" onChange={handleChange}/>
          <button className="bg-blue-500 text-gray-50 rounded-md h-10 hover:bg-blue-400" onClick={handleFundTransfer}>Initiate Transfer</button>
        </div>
      </Modal>
    </div>
  );
}
