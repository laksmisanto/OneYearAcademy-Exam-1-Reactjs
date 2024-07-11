import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" bg-sky-600 text-white">
      <div className="container">
        <ul className="flex justify-center gap-8 py-3">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/taskview">Task View</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
