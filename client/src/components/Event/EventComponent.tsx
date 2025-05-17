import { useNavigate } from "react-router-dom";

type EventType = {
  _id: string;
  name: string;
  description: string;
  category: string[];
  date: string | Date;
  venue: string;
  price: number;
  image: string;
};

type EventCardProps = {
  event: EventType;
};
function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();
  function goToEventDetails(id: string) {
    navigate(`/events/${id}`);
  }
  console.log("event", event);

  return (
    <div className="w-[300px] sx:w-[350px] rounded-2xl shadow-lg hover:scale-101 transition ease-in duration-300  bg-white overflow-hidden">
      <img
        src={event.image}
        alt="event_image"
        className="w-full h-50 object-cover rounded-t-2xl"
      />

      <div className="p-5 space-y-3">
        <p className="text-sm text-gray-600">
          <span className="font-bold text-black">
            {new Date(event.date).toLocaleString("default", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>

        {/* <p className="text-sm text-gray-600">
          <span className="font-bold text-black">
            {new Date(event.date).toLocaleString("default", {
              year: "numeric",
              day: "numeric",
            })}
            -
          </span>
          {new Date(event.date).toLocaleString("default", { month: "long" })}
        </p> */}
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">
          {event.name}
        </h2>

        <p className="text-sm text-gray-500">{event.venue}</p>

        <div className="flex justify-end">
          <button
            onClick={() => goToEventDetails(event?._id)}
            className=" cursor-pointer bg-blue-600 hover:bg-blue-700 border-0 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Book
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-3">
          {event.category?.map((category: string, index: number) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
