import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./Pages/Home/Home";
import EventDetails from "./Pages/EventDetails/EventDetails";
import LoginPage from "./Pages/SignIn/SignInPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import { Toaster } from "sonner";
import AdminRouteProtect from "./components/Admin/AdminRouteProtect";
import AdminEvents from "./Pages/Admin/AdminEvents";
import AdminCreateEvent from "./Pages/Admin/AdminCreateEvent";
import AdminEditEvent from "./Pages/Admin/AdminEditEvent";
import Congratulations from "./Pages/Congratulations/Congratulations";
import BookingsPage from "./Pages/BookingPage/BookingPage";
function App() {
  console.log("Alias test:", import.meta.env);
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <Toaster />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/congratulations" element={<Congratulations />} />
            <Route path="/my-bookings" element={<BookingsPage />} />
            <Route
              path="/admin/events/create"
              element={
                <AdminRouteProtect>
                  <AdminCreateEvent />
                </AdminRouteProtect>
              }
            />

            <Route
              path="/admin/events"
              element={
                <AdminRouteProtect>
                  <AdminEvents />
                </AdminRouteProtect>
              }
            />
            <Route
              path="/admin/events/edit/:id"
              element={
                <AdminRouteProtect>
                  <AdminEditEvent />
                </AdminRouteProtect>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
