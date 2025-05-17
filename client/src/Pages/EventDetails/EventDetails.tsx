import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // import useNavigate
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleEvent } from "../../Store/features/events/eventsThunks";
import type { AppDispatch, RootState } from "../../Store/store";
import { createBookingThunk } from "@/Store/features/Book/BookThunk";
import { toast } from "sonner";

function SingleEventPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // initialize navigate
  const dispatch = useDispatch<AppDispatch>();
  const { singleEvent, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  // Local state to track booking status
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchSingleEvent(id));
  }, [dispatch, id]);

  const handleBooking = async () => {
    if (id && !isBooked) {
      try {
        await dispatch(createBookingThunk(id)).unwrap();
        toast.success("Event Is Booked Successfully.");

        setIsBooked(true); // update local state to booked
        navigate("/congratulations"); // redirect to congratulations screen
      } catch (err) {
        console.error(err);
        toast.error(err as string);
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!singleEvent)
    return <div className="text-center mt-10">Event not found</div>;

  const { name, description, category, date, venue, price, image } =
    singleEvent;

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-white px-4 py-12">
      <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-gray-200 rounded-3xl p-6 max-w-5xl w-full flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-md">
          <img
            src={image}
            alt={name}
            className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between w-full md:w-1/2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-3">{name}</h1>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              {description}
            </p>

            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                <span className="font-semibold">Venue:</span> {venue}
              </li>
              <li>
                <span className="font-semibold">Price:</span> ${price}
              </li>
              <li>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(date).toLocaleDateString("default", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </li>
              <li>
                <span className="font-semibold">Category:</span>{" "}
                {category.join(", ")}
              </li>
            </ul>
          </div>

          <div>
            <button
              onClick={handleBooking}
              disabled={isBooked}
              className={`w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                isBooked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isBooked ? "Booked" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEventPage;
