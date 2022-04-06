import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// Components
import MenuBar from "./components/MenuBar";

// Context
import { AuthContext, AuthProvider } from "./context/auth";
import { useContext } from "react";

import AuthRoute from "./util/AuthRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<AuthRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" element={<AuthRoute />}>
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/posts/:postId" element={<SinglePost />} />
          </Routes>
        </Container>
      </Router>
      {/* // <div>App</div> */}
    </AuthProvider>
  );
}

export default App;
