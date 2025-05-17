import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  fetchSingleEvent,
  updateEventThunk,
} from "@/Store/features/events/eventsThunks";
import type { AppDispatch, RootState } from "@/Store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import Select from "react-select";
import { uploadFile } from "@/utils/supabaseUploading";

const categoryOptions = [
  { value: "Festival", label: "Festival" },
  { value: "Culture", label: "Culture" },
  { value: "Arts", label: "Arts" },
  { value: "Sports", label: "Sports" },
  { value: "Food", label: "Food" },
];

const eventSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.array(z.string()).min(1, "Select at least one category"),
  date: z.date({ required_error: "Date is required" }),
  venue: z.string().min(1, "Venue is required"),
  price: z.number().min(0, "Price cannot be negative"),
  image: z.string().url({ message: "Image is required" }),
});

type EventFormData = z.infer<typeof eventSchema>;

function AdminEditEvent() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const event = useSelector((state: RootState) => state.events.singleEvent);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleEvent(id))
        .unwrap()
        .then(() => {
          toast.success("Event fetched successfully.");
        })
        .catch(() => {
          toast.error("Failed to fetch event.");
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      const formattedData: EventFormData = {
        name: event.name || "",
        description: event.description || "",
        category: event.category || [],
        date: new Date(event.date),
        venue: event.venue || "",
        price: Number(event.price),
        image: event.image || "",
      };
      reset(formattedData);
      setPreview(event.image);
    }
  }, [event, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreview(previewUrl);
      setValue("image", previewUrl); // mock URL until upload is handled
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setValue("image", "");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  console.log("selectedFile", selectedFile);
  const onSubmit = async (data: EventFormData) => {
    try {
      setLoading(true);
      console.log("Submitting data:", data);
      if (!selectedFile && !event?.image) {
        toast.error("Please select an image.");
        return;
      }
      let imageUrl = event?.image;

      if (selectedFile) {
        const uploaded = await uploadFile(selectedFile);
        imageUrl = uploaded.url ?? "";
      }
      // const imageUrl = uploaded.url;

      const formDataWithUrl: EventFormData = {
        ...data,
        image: imageUrl ?? "",
      };
      // Simulate or replace with actual API call
      await dispatch(updateEventThunk({ event: formDataWithUrl, id: id! }));

      toast.success("Event updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  if (!event)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-2">Edit Event</h1>
      <p className="text-muted-foreground mb-6">
        Update the form and click "Save changes".
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...register("description")} />
          {errors.description && (
            <p className="text-sm text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                options={categoryOptions}
                isMulti
                value={categoryOptions.filter((o) =>
                  field?.value?.includes(o.value)
                )}
                onChange={(selected) =>
                  field.onChange(selected.map((s) => s.value))
                }
              />
            )}
          />
          {errors.category && (
            <p className="text-sm text-red-600 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Venue */}
        <div>
          <Label htmlFor="venue">Venue</Label>
          <Input id="venue" {...register("venue")} />
          {errors.venue && (
            <p className="text-sm text-red-600 mt-1">{errors.venue.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <Label htmlFor="date">Date</Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input
                type="date"
                value={
                  field.value ? field.value.toISOString().substring(0, 10) : ""
                }
                onChange={(e) => field.onChange(new Date(e.target.value))}
              />
            )}
          />
          {errors.date && (
            <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Image */}
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={handleFileChange}
          />
          {errors.image && (
            <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>
          )}
        </div>

        {preview && (
          <div className="relative inline-block mt-2">
            <img
              src={preview}
              alt="Preview"
              className="rounded border max-h-48 object-contain"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              aria-label="Remove selected image"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="text-right mt-6">
          <Button type="submit" disabled={loading}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminEditEvent;
