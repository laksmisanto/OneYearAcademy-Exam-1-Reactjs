import TaskView from "./components/TaskView.jsx";
import firebaseConfig from "../DB/firebaseConfig.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout.jsx";
import Contact from "./components/Contact.jsx";
import TaskForms from "./components/TaskForms.jsx";

// import Forms from "./components/Forms";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<TaskForms />} />
          <Route path="/taskview" element={<TaskView />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      {/* <Navbar />
      <Forms /> 
      <TaskView />
      <Footer /> */}
    </>
  );
}

export default App;
