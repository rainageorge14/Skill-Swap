import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BrowseUsers from "./pages/BrowseUsers";
import Requests from "./pages/Requests";
import Connections from "./pages/Connections";
import AppLayout from "./layouts/AppLayout";
import Chat from "./pages/Chat";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Layout Routes */}

        <Route element={<AppLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/browse"
            element={<BrowseUsers />}
          />

          <Route
            path="/requests"
            element={<Requests />}
          />

          <Route
            path="/connections"
            element={<Connections />}
          />

        </Route>

        <Route
          path="/chat/:id"
          element={<Chat />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;