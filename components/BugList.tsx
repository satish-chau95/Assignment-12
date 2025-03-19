"use client";

import { useStore, Bug } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import EditBugDialog from "@/components/EditBugDialog";
import TimeTrackingDialog from "@/components/TimeTrackingDialog";

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const statusColors = {
  open: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  "pending-approval": "bg-yellow-100 text-yellow-800",
  closed: "bg-green-100 text-green-800",
  reopened: "bg-red-100 text-red-800",
};

interface BugListProps {
  filterStatus: string;
  filterPriority: string;
  searchTerm: string;
}

export default function BugList({
  filterStatus,
  filterPriority,
  searchTerm,
}: BugListProps) {
  const user = useStore((state) => state.user);
  const bugs = useStore((state) => state.bugs);
  const updateBug = useStore((state) => state.updateBug);

  const filteredBugs = bugs.filter((bug) => {
    if (
      filterStatus !== "all" &&
      bug.status.toLowerCase() !== filterStatus.toLowerCase()
    )
      return false;
    if (
      filterPriority !== "all" &&
      bug.priority.toLowerCase() !== filterPriority.toLowerCase()
    )
      return false;
    if (
      searchTerm &&
      !bug.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !bug.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const handleStatusChange = (bug: Bug, newStatus: Bug["status"]) => {
    updateBug(bug.id, { status: newStatus });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Time Spent</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBugs.map((bug) => (
            <TableRow key={bug.id}>
              <TableCell className="font-medium">{bug.title}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={priorityColors[bug.priority]}
                >
                  {bug.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={statusColors[bug.status]}
                >
                  {bug.status}
                </Badge>
              </TableCell>
              <TableCell>{bug.assignee}</TableCell>
              <TableCell>
                {format(new Date(bug.createdAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                {Math.floor(bug.timeSpent / 60)}h {bug.timeSpent % 60}m
              </TableCell>
              <TableCell className="text-right space-x-2">
                <TimeTrackingDialog bugId={bug.id} />
                <EditBugDialog bug={bug} />
                {user?.role === "developer" &&
                  bug.status !== "pending-approval" &&
                  bug.status !== "closed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleStatusChange(bug, "pending-approval")
                      }
                    >
                      Mark Complete
                    </Button>
                  )}
                {user?.role === "manager" &&
                  bug.status === "pending-approval" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(bug, "closed")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(bug, "reopened")}
                      >
                        Reopen
                      </Button>
                    </>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}