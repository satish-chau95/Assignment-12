"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BugList from "@/components/BugList";
import CreateBugDialog from "@/components/CreateBugDialog";
import TimeTrackingChart from "@/components/TimeTrackingChart";
import { LogOut, Plus, Filter } from "lucide-react";

export default function DashboardContent() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h1>
            <div className="flex items-center space-x-4">
              <CreateBugDialog />
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Total Bugs</h3>
            <p className="text-3xl font-bold">
              {useStore((state) => state.bugs.length)}
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Open Bugs</h3>
            <p className="text-3xl font-bold">
              {
                useStore((state) =>
                  state.bugs.filter((bug) => bug.status === "open")
                ).length
              }
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Pending Approval</h3>
            <p className="text-3xl font-bold">
              {
                useStore((state) =>
                  state.bugs.filter((bug) => bug.status === "pending-approval")
                ).length
              }
            </p>
          </Card>
        </div>

        <div className="mb-8">
          <TimeTrackingChart />
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold">Bug List</h2>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <Input
                  placeholder="Search bugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                <Select
                  value={filterStatus}
                  onValueChange={setFilterStatus}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="pending-approval">
                      Pending Approval
                    </SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <BugList
            filterStatus={filterStatus}
            filterPriority={filterPriority}
            searchTerm={searchTerm}
          />
        </div>
      </main>
    </div>
  );
}