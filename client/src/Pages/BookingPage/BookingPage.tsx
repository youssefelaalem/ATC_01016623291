// src/pages/MyBookingsPage.tsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsThunk } from "@/Store/features/Book/BookThunk";
import type { AppDispatch, RootState } from "@/Store/store";

function BookingsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading, error } = useSelector((state: RootState) => state.Book);

  useEffect(() => {
    dispatch(fetchBookingsThunk());
  }, [dispatch]);

  if (loading) return <div className="text-center mt-10">Loading bookings...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Booked Events</h1>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">You have no bookings yet.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row"
            >
              <img
                src={booking.event.image}
                alt={booking.event.name}
                className="w-full md:w-1/3 h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 mb-1">
                    {booking.event.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-1">
                    Date:{" "}
                    {new Date(booking.event.date).toLocaleDateString("default", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Venue: {booking.event.venue}
                  </p>
                </div>
                <p className="text-sm font-bold text-green-600 mt-2">Booked ✅</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
