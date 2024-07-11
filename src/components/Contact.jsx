const Contact = () => {
  return (
    <>
      <div className="container w-full min-h-[87vh] flex items-center justify-between">
        <div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d324456.430283235!2d88.44929769172002!3d26.041048777963223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4ead8c059a75f%3A0xc71a02fe62d267fe!2sThakurgaon%20Sadar%20Upazila!5e0!3m2!1sen!2sbd!4v1720710758298!5m2!1sen!2sbd"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>

            <div className="shadow-md bg-gray-50 border p-5 w-full rounded">
              <h2 className="font-sans font-semibold text-2xl text-gray-800 text-center mb-4">
                Add your task
              </h2>
              <div className="mb-2">
                <label className="font-sans text-lg text-gray-800">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="font-sans text-lg text-gray-800 w-full border border-gray-200 px-2 py-1 outline-none rounded"
                />
              </div>
              <div className="mb-2">
                <label className="font-sans text-lg text-gray-800">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="font-sans text-lg text-gray-800 w-full border border-gray-200 px-2 py-1 outline-none rounded"
                />
              </div>
              <div className="mb-2">
                <label className="font-sans text-lg text-gray-800">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone number"
                  className="font-sans text-lg text-gray-800 w-full border border-gray-200 px-2 py-1 outline-none rounded"
                />
              </div>
              <div>
                <label className="font-sans text-lg text-gray-800">Title</label>
                <textarea
                  name="message"
                  maxLength={100}
                  placeholder="Message..."
                  className="font-sans text-lg text-gray-800 w-full border border-gray-200 px-2 py-1 outline-none rounded min-h-28 max-h-28"
                />
              </div>
              <div>
                <button className="font-sans text-lg text-white bg-sky-600 py-1 px-3 rounded-md mr-2">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
