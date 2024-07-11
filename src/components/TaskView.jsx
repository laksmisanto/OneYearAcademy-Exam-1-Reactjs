"use client";
import { getDatabase, onValue, ref, remove, update } from "firebase/database";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskView = () => {
  const [content, setContent] = useState([]);
  const [updateDataModal, setUpdateDataModal] = useState(false);
  const [ids, setIds] = useState("");
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "TaskData");
    onValue(starCountRef, (snapshot) => {
      let contentArr = [];
      snapshot.forEach((item) => {
        contentArr.push({ ...item.val(), id: item.key });
      });
      setContent(contentArr);
    });
  }, []);

  //data update modal and update this data

  const [textCount, setTextCount] = useState(100);

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

  const handleEditData = (item) => {
    setUpdateDataModal(true);
    setMsg({
      name: item.name,
      title: item.title,
      message: item.message,
    });
    setIds(item.id);
  };

  const handleUpdateData = () => {
    if (msg.name && msg.title && msg.message) {
      update(ref(db, "TaskData/" + ids), {
        name: msg.name,
        title: msg.title,
        message: msg.message,
      }).then(() => {
        setUpdateDataModal(false);
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

  const handleDeleteData = (item) => {
    remove(ref(db, "TaskData/" + item.id)).then(() => {
      toast.warn("Permanently delete Your Data", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };

  return (
    <>
      <div className="container w-full min-h-[74vh] my-10">
        <h2 className="font-sans font-bold text-2xl text-gray-800 mb-10">
          All Content
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {content.map((item, i) => (
            <div key={i} className="shadow-lg border p-5 rounded">
              <h4 className="font-sans font-bold text-2xl  text-gray-800">
                {item.name}
              </h4>
              <h6 className="font-sans font-semibold text-lg  text-gray-800 mb-2">
                {item.title}
              </h6>
              <p className="font-sans font-normal text-base text-gray-600">
                {item.message}
              </p>
              <div className="mt-5">
                <button
                  onClick={() => handleEditData(item)}
                  className="font-sans text-lg text-white bg-green-800 py-1 px-3 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteData(item)}
                  className="font-sans text-lg text-white bg-red-800 py-1 px-3 rounded-md mr-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* modal */}
      {updateDataModal ? (
        <div className="w-full h-full top-0 left-0 backdrop-blur-sm absolute">
          <ToastContainer />
          <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 shadow-md bg-gray-50 p-5 w-96 rounded">
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
              <div>
                <button
                  onClick={handleUpdateData}
                  className="font-sans text-lg text-white bg-green-800 py-1 px-3 rounded-md mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setUpdateDataModal(false)}
                  className="font-sans text-lg text-white bg-red-800 py-1 px-3 rounded-md mr-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TaskView;
