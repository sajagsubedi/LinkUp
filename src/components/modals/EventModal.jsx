"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, EyeClosed, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventModal({
  open,
  onOpenChange,
  onSave,
  event,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      image: undefined,
      location: event?.location || "",
      date: event?.date || "",
      time: event?.time || "",
      category: event?.category || "",
      organizer: event?.organizer || "",
      max_attendees: event?.max_attendees || "",
      is_active: event?.is_active ?? true,
    },
  });

  const [visibility, setVisibility] = useState(event?.is_active ?? true);
  const [imageUrl, setImageUrl] = useState(
    event?.image_url || "/assets/placeholder.png"
  );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImageUrl(reader.result);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="z-99 bg-black/10 w-screen h-screen absolute top-0 left-0">
        <DialogContent className="w-[80vw] sm:max-w-3xl md:max-w-4xl max-w-[1000px] max-h-[90vh] overflow-y-auto z-99">
          <DialogHeader>
            <DialogTitle>{event ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSave)} className="space-y-4 pr-2">
            {/* Image Upload */}
            <div className="mb-4">
              <label className="leading-7 text-sm text-gray-600">
                Event Image
              </label>
              <div className="w-full flex justify-center">
                <div className="bg-gray-50 rounded-lg overflow-hidden w-48 h-32 relative">
                  <img
                    src={imageUrl}
                    width={192}
                    height={128}
                    alt="Event thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute w-full h-full top-0 right-0 flex justify-center items-center">
                    <Plus className="text-white absolute" />
                  </div>
                  <div className="absolute w-full h-full top-0 right-0 flex justify-center items-center bg-gray-600 opacity-20"></div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute z-[99] inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Enter event description"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter location"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.location && (
                <p className="text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="text"
                {...register("time", { required: "Time is required" })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.time && (
                <p className="text-sm text-red-500">{errors.time.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Career">Career</option>
                <option value="Workshop">Workshop</option>
                <option value="Education">Education</option>
                <option value="Competition">Competition</option>
                <option value="Networking">Networking</option>
                <option value="Conference">Conference</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organizer
              </label>
              <input
                type="text"
                {...register("organizer", {
                  required: "Organizer is required",
                })}
                placeholder="Enter organizer name"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.organizer && (
                <p className="text-sm text-red-500">
                  {errors.organizer.message}
                </p>
              )}
            </div>

            {/* Max Attendees */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Max Attendees
              </label>
              <input
                type="number"
                {...register("max_attendees", {
                  required: "Max attendees is required",
                  min: { value: 1, message: "Must be greater than 0" },
                })}
                placeholder="Enter max attendees"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.max_attendees && (
                <p className="text-sm text-red-500">
                  {errors.max_attendees.message}
                </p>
              )}
            </div>

            {/* Active Toggle */}
            <div className="items-center flex gap-2">
              <span className="text-sm font-medium text-gray-700">Active:</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setVisibility((val) => !val);
                  setValue("is_active", !visibility);
                }}
                className={`p-2 rounded-full ${
                  visibility
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {visibility ? <Eye size={20} /> : <EyeClosed size={20} />}
              </button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onCancel} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
