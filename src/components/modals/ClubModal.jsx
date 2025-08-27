"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

const clubCategories = [
  "Technology",
  "Arts",
  "Business",
  "Sports",
  "Science",
  "Social",
];

export default function ClubModal({ open, onOpenChange, onSave, club, onCancel }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: club?.name || "",
      description: club?.description || "",
      image: undefined,
      location: club?.location || "",
      category: club?.category || "",
      creator: club?.creator || "",
      requirements: club?.requirements || [],
      benefits: club?.benefits || [],
      is_active: club?.is_active ?? true,
    },
  });

  const [imageUrl, setImageUrl] = useState(club?.image_url || "/assets/placeholder.png");
  const [newRequirement, setNewRequirement] = useState("");
  const [newBenefit, setNewBenefit] = useState("");

  const watchedRequirements = watch("requirements");
  const watchedBenefits = watch("benefits");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImageUrl(reader.result);
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      const currentRequirements = watch("requirements") || [];
      setValue("requirements", [...currentRequirements, newRequirement.trim()]);
      setNewRequirement("");
    }
  };

  const removeRequirement = (index) => {
    const currentRequirements = watch("requirements") || [];
    setValue("requirements", currentRequirements.filter((_, i) => i !== index));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      const currentBenefits = watch("benefits") || [];
      setValue("benefits", [...currentBenefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index) => {
    const currentBenefits = watch("benefits") || [];
    setValue("benefits", currentBenefits.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="z-99 bg-black/10 w-screen h-screen absolute top-0 left-0">
        <DialogContent className="w-[80vw] sm:max-w-3xl md:max-w-4xl max-w-[1000px] max-h-[90vh] overflow-y-auto z-99">
          <DialogHeader>
            <DialogTitle>{club ? "Edit Club" : "Add Club"}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSave)} className="space-y-4 pr-2">
            {/* Image Upload */}
            <div className="mb-4">
              <label className="leading-7 text-sm text-gray-600">Club Image</label>
              <div className="w-full flex justify-center">
                <div className="bg-gray-50 rounded-lg overflow-hidden w-48 h-32 relative">
                  <img
                    src={imageUrl}
                    width={192}
                    height={128}
                    alt="Club thumbnail"
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

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Club Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Enter club name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Enter club description"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="Enter location"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {clubCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>

            {/* Creator */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Creator</label>
              <input
                type="text"
                {...register("creator", { required: "Creator is required" })}
                placeholder="Enter creator name"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              />
              {errors.creator && <p className="text-sm text-red-500">{errors.creator.message}</p>}
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add a requirement"
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                />
                <Button type="button" onClick={addRequirement} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {watchedRequirements?.map((req, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {req}
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Benefits</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Add a benefit"
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                />
                <Button type="button" onClick={addBenefit} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {watchedBenefits?.map((benefit, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onCancel} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Club"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
}
