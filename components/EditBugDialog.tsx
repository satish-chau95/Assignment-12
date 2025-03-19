"use client";

import { useState } from "react";
import { useStore, Bug } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2 } from "lucide-react";

interface EditBugDialogProps {
  bug: Bug;
}

export default function EditBugDialog({ bug }: EditBugDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(bug.title);
  const [description, setDescription] = useState(bug.description);
  const [priority, setPriority] = useState(bug.priority);
  const [assignee, setAssignee] = useState(bug.assignee);
  const [dueDate, setDueDate] = useState(bug.dueDate);

  const updateBug = useStore((state) => state.updateBug);
  const deleteBug = useStore((state) => state.deleteBug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBug(bug.id, {
      title,
      description,
      priority,
      assignee,
      dueDate,
    });
    setOpen(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this bug?")) {
      deleteBug(bug.id);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bug</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Select
              value={priority}
              onValueChange={(value: "low" | "medium" | "high") =>
                setPriority(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit">Update Bug</Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              Delete Bug
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}