import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "@/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Store/features/Auth/AuthSlice";
function Header() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.Auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const goToLoginPage = () => {
    navigate("/login");
  };
  const logOutFun = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };
  return (
    <header className="bg-[#184297] text-white flex justify-between px-6 md:px-20 py-5 items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        <Link to={"/"}>
          events<span className="text-[#00bcda]">.</span>com
        </Link>
      </h1>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-8 text-[16px] items-center md:text-[20px]">
        <ul role="list" className="flex font-bold list-none gap-6">
          <li>
            <a href="/my-bookings">My Tickets</a>
          </li>
          <li>
            <a href="#">Discover Events</a>
          </li>
          <li>
            <a href="#">Old Events</a>
          </li>
          {user?.role === "admin" && (
            <li>
              {/* <a href="/admin/events">Admin Portal</a> */}
              <Link to={"/admin/events"}>Admin Portal</Link>
            </li>
          )}
        </ul>
        <div>
          {user ? (
            <>
              <span className="px-3 text-neutral-100 text-sm">
                Welcome, {user.username}
              </span>
              <button
                onClick={logOutFun}
                className="h-10 bg-[#1d7158] text-white px-4 rounded shadow-md hover:bg-[#1d71589d] transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={goToLoginPage}
              className="h-10 bg-[#1d7158] text-white px-4 rounded shadow-md hover:bg-[#1d71589d] transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className=" bg-[#2859bb] hover:bg-[#6180bd]"
              size="icon"
            >
              <Menu className="text-[#c9f001]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#184297] text-white">
            <ul className="flex flex-col gap-6 list-none  mt-10 text-lg font-bold">
              <li>
                <a href="/my-bookings">My Tickets</a>
              </li>
              <li>
                <a href="#">Discover Events</a>
              </li>
              <li>
                <a href="#">Create Events</a>
              </li>
              <li>
                <div>
                  {user ? (
                    <>
                      <span className="px-3 text-neutral-100 text-sm">
                        Welcome, {user.username}
                      </span>
                      <button
                        onClick={logOutFun}
                        className="h-10 bg-[#1d7158] text-white px-4 rounded shadow-md hover:bg-[#1d71589d] transition duration-300"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={goToLoginPage}
                      className="h-10 bg-[#1d7158] text-white px-4 rounded shadow-md hover:bg-[#1d71589d] transition duration-300"
                    >
                      Login
                    </button>
                  )}
                </div>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Header;
