import EventCard from "../../components/Event/EventComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../Store/features/events/eventsThunks";
import type { RootState, AppDispatch } from "../../Store/store";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center px-10">
      <h1 className="text-blue-800">Featured events</h1>
      <div className="flex flex-row gap-3 mb-10 justify-center flex-wrap">
        {events?.map((event) => (
          <EventCard key={event?._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Home;
