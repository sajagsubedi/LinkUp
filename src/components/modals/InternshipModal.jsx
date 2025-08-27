import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

const internshipTypes = ["remote", "onsite", "hybrid"];

const InternshipModal = ({
  open,
  onOpenChange,
  onSave,
  internship,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    type: "remote",
    duration: "",
    stipend: "",
    requirements: "",
    deadline: new Date(),
  });

  const [date, setDate] = useState(new Date());

  // Initialize form with internship data if editing
  useEffect(() => {
    if (internship) {
      setFormData({
        title: internship.title || "",
        company: internship.company || "",
        description: internship.description || "",
        location: internship.location || "",
        type: internship.type || "remote",
        duration: internship.duration || "",
        stipend: internship.stipend || "",
        requirements: internship.requirements
          ? internship.requirements.join(", ")
          : "",
        deadline: new Date(internship.deadline),
      });
      setDate(new Date(internship.deadline));
    }
  }, [internship]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setFormData((prev) => ({ ...prev, deadline: selectedDate }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert requirements string to array
    const requirementsArray = formData.requirements
      .split(",")
      .map((req) => req.trim())
      .filter((req) => req !== "");

    onSave({
      ...formData,
      requirements: requirementsArray,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="absolute top-0 left-0 bg-gray-900/20 h-screen w-screen z-99">
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto z-999">
          <DialogHeader>
            <DialogTitle>
              {internship ? "Edit Internship" : "Create New Internship"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            {/* Title */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Frontend Developer Intern"
                required
              />
            </div>

            {/* Company */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="TechStart Inc."
                required
              />
            </div>

            {/* Description */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the internship opportunity..."
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Location */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="New York, NY"
                required
              />
            </div>

            {/* Type */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="type">Type *</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                {internshipTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="3 months"
                required
              />
            </div>

            {/* Stipend */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="stipend">Stipend</Label>
              <Input
                id="stipend"
                name="stipend"
                value={formData.stipend}
                onChange={handleInputChange}
                placeholder="$1,000/month"
              />
            </div>

            {/* Requirements */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="requirements">
                Requirements (comma-separated)
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="React, JavaScript, HTML/CSS, Git"
                className="min-h-[80px]"
              />
            </div>

            {/* Deadline */}
            <div className="grid w-full items-center gap-2">
              <Label>Application Deadline *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      `${
                        date.getMonth() + 1
                      }/${date.getDate()}/${date.getFullYear()}`
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit">
                {internship ? "Update Internship" : "Create Internship"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default InternshipModal;
