"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface TimeTrackingDialogProps {
  bugId: string;
}

export default function TimeTrackingDialog({ bugId }: TimeTrackingDialogProps) {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");

  const updateTimeSpent = useStore((state) => state.updateTimeSpent);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    updateTimeSpent(bugId, totalMinutes);
    setHours("0");
    setMinutes("0");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Time</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Input
                type="number"
                min="0"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                type="number"
                min="0"
                max="59"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Log Time
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}