import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import { uploadFile } from "@/utils/supabaseUploading";
import { Loader2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { createEventThunk } from "@/Store/features/events/eventsThunks";
import type { AppDispatch } from "@/Store/store";
import { toast } from "sonner";

const options = [
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
  image: z.string().url(),
});

type EventFormData = z.infer<typeof eventSchema>;

function AdminCreateEventPage() {
  const dispatch = useDispatch<AppDispatch>();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // const {  } = useSelector((state: RootState) => state.events);
  console.log("loading", loading);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      category: [],
      image: "",
      price: 0,
    },
  });
  console.log("Form errors:", errors);
  useEffect(() => {
    const subscription = watch((value) => {
      console.log("Form changed:", value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: EventFormData) => {
    setLoading(true);
    try {
      console.log("selectedFile", selectedFile);

      if (!selectedFile) {
        alert("Please select an image");
        return;
      }

      const uploaded = await uploadFile(selectedFile);
      const imageUrl = uploaded.url;

      const formDataWithUrl: EventFormData = {
        ...data,
        image: imageUrl ?? "",
      };

      console.log("Form Submitted:", formDataWithUrl);

      // send to backend
      try {
        const ff = await dispatch(createEventThunk(formDataWithUrl)).unwrap();
        console.log("FFFF", ff);

        toast.success(`event created successfully.`);
      } catch (err) {
        console.log("mmm", err);

        // toast.error(
        //   err instanceof Error ? err.message : "there is issue with submit."
        // );
        toast.error(err as string);
        console.error("error login", err);
      }
      reset();
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", URL.createObjectURL(file));
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="animate-spin h-6 w-6 text-primary" />
        </div>
      )}
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-2">Create New Event</h1>
        <p className="text-muted-foreground mb-6">
          Please fill out the form and click save when you're done.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <Label htmlFor="name" className="mb-1">
              Name
            </Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <Label htmlFor="description" className="mb-1">
              Description
            </Label>
            <Input id="description" {...register("description")} />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category - Multi Select */}
          <div className="flex flex-col">
            <Label htmlFor="category" className="mb-1">
              Category
            </Label>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  isMulti
                  onChange={(selected) =>
                    field.onChange(selected ? selected.map((s) => s.value) : [])
                  }
                  value={options.filter((option) =>
                    field.value.includes(option.value)
                  )}
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
          <div className="flex flex-col">
            <Label htmlFor="venue" className="mb-1">
              Venue
            </Label>
            <Input id="venue" {...register("venue")} />
            {errors.venue && (
              <p className="text-sm text-red-600 mt-1">
                {errors.venue.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <Label htmlFor="price" className="mb-1">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-sm text-red-600 mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <Label htmlFor="date" className="mb-1">
              Date
            </Label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Input
                  id="date"
                  type="date"
                  value={
                    field.value
                      ? field.value.toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              )}
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div className="flex flex-col">
            <Label htmlFor="image" className="mb-1">
              Image
            </Label>
            <Input
              ref={imageRef}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {errors.image && (
            <p className="text-sm text-red-600 mt-1">{errors.image.message}</p>
          )}

          {/* Image Preview + Remove Button */}
          {preview && (
            <div className="flex items-start gap-4 mt-2">
              <div className="relative inline-block">
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
            </div>
          )}

          <div className="text-right mt-6">
            <Button type="submit" disabled={loading}>
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminCreateEventPage;
