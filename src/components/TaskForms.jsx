import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forms = () => {
  const db = getDatabase();
  const [textCount, setTextCount] = useState(100);
  const [checked, setChecked] = useState(false);
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

  const handleResetData = () => {
    setMsg({
      name: "",
      title: "",
      message: "",
    });
    setTextCount(limit);
    setChecked(false);
  };

  const handleSubmitData = () => {
    if (msg.name && msg.title && msg.message) {
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
        setChecked(false);
        setTextCount(limit);
        setMsg({
          name: "",
          title: "",
          message: "",
        });
      });
    } else {
      toast.warn("Please fill all input field", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <div className="w-full  min-h-[87vh] flex justify-center items-center">
        <ToastContainer />
        <div className="shadow-md bg-gray-50 border p-5 w-96 rounded">
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
            <label className="font-sans text-lg text-gray-800">Message</label>
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
          </div>
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={checked}
              onClick={() => setChecked(!checked)}
            />
            <label htmlFor="checkbox" className="ml-2">
              i want to add this task
            </label>
          </div>
          <div>
            {checked ? (
              <button
                onClick={handleSubmitData}
                className="font-sans text-lg text-white bg-sky-600 py-1 px-3 rounded-md mr-2"
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                disabled
                onClick={handleSubmitData}
                className="font-sans text-lg text-white bg-gray-400 py-1 px-3 rounded-md mr-2"
              >
                Save
              </button>
            )}
            <button
              onClick={handleResetData}
              className="font-sans text-lg text-white bg-red-800 py-1 px-3 rounded-md mr-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
