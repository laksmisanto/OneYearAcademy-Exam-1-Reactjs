import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateModal = () => {
  const db = getDatabase();
  const [textCount, setTextCount] = useState(100);

  //   const [updateDataModal, setUpdateDataModal] = useState(true);

  const [msg, setMsg] = useState({
    name: "",
    title: "",
    message: "",
  });

  const limit = 100;
  const handleMsgData = (e) => {
    const fieldName = e.target.name;
    if (fieldName == "message") {
      let text = e.target.value;
      let count = limit - text.length;
      setTextCount(count);
    }

    const { name, value } = e.target;

    setMsg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitData = () => {
    set(push(ref(db, "TaskData")), {
      name: msg.name,
      title: msg.title,
      message: msg.message,
    }).then(() => {
      toast.success("Data successfully submitted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setMsg({
        name: "",
        title: "",
        message: "",
      });
    });
  };

  return (
    <>
      <div className="w-full h-screen top-0 left-0 backdrop-blur-sm absolute">
        <ToastContainer />
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 shadow-md bg-gray-100 border p-5 w-96 rounded">
          <h2 className="font-sans font-semibold text-2xl text-gray-800 text-center mb-4">
            Add your task
          </h2>
          <div className="mb-2">
            <label className="font-sans text-lg text-gray-800">Name</label>
            <input
              type="text"
              name="name"
              value={msg.name}
              placeholder="Name"
              onChange={handleMsgData}
              className="font-sans text-lg text-gray-800 w-full border border-gray-200 px-2 py-1 outline-none rounded"
            />
          </div>
          <div className="mb-2">
            <label className="font-sans text-lg text-gray-800">Title</label>
            <input
              type="text"
              name="title"
              value={msg.title}
              onChange={handleMsgData}
              placeholder="Title"
              className="font-sans text-lg text-gray-800 w-full border border-gray-200 px-2 py-1 outline-none rounded"
            />
          </div>
          <div>
            <label className="font-sans text-lg text-gray-800">Title</label>
            <textarea
              name="message"
              value={msg.message}
              maxLength={100}
              placeholder="Message..."
              onChange={handleMsgData}
              className="font-sans text-lg text-gray-800 w-full border border-gray-200 px-2 py-1 outline-none rounded min-h-28 max-h-28"
            />
            <div className="text-right">
              {textCount >= 0 && (
                <div className="font-sans text-base text-gray-500">
                  {textCount} character remaining
                </div>
              )}
            </div>
            <div>
              <button
                onClick={handleSubmitData}
                className="font-sans text-lg text-white bg-green-800 py-1 px-3 rounded-md mr-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateModal;
