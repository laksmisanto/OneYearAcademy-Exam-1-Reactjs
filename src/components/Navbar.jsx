const Navbar = () => {
  return (
    <div className=" bg-sky-600 text-white">
      <div className="container">
        <ul className="flex justify-center gap-8 py-3">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/taskview">Task View</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
