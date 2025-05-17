import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Store/store";
import {
  deleteEventThunk,
  fetchEvents,
} from "@/Store/features/events/eventsThunks";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminEvents = () => {
  const navigate = useNavigate();
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/admin/events/edit/${id}`);
  };

  return (
    <>
      <div className="p-6 my-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">All Events</h2>
          <Button
            onClick={() => navigate("/admin/events/create")}
            className="flex gap-2"
          >
            New Event <Plus size={18} />
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.length > 0 ? (
              events.map((event) => (
                <TableRow key={event._id}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    {new Date(event.date).toLocaleString("default", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{event.venue}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.price}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleEdit(event._id)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => setEventToDelete(event._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No events yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={!!eventToDelete}
        onOpenChange={() => setEventToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this event?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEventToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (eventToDelete) {
                  try {
                    console.log("Confirmed delete", eventToDelete);
                    await dispatch(deleteEventThunk(eventToDelete)).unwrap(); // uncomment when ready
                    toast.success("event is deleted successfully.");
                    setEventToDelete(null);
                    dispatch(fetchEvents());
                  } catch (error) {
                    console.error(error);
                    toast.error("there is issue with deleting event.");
                  }
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminEvents;
