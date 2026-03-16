import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Hero from "./components/Hero";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Requests from "./components/Requests";
import Friends from "./components/Friends";
import IgnoredUsers from "./components/ignoredUsers";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options for all toasts
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "10px",
              border: "1px solid #444",
            },

            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4ade80",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#f87171",
                secondary: "#fff",
              },
            },
          }}
        />
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/ignored" element={<IgnoredUsers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
