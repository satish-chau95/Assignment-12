"use client";

import { useStore } from "@/lib/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays, startOfDay } from "date-fns";

export default function TimeTrackingChart() {
  const bugs = useStore((state) => state.bugs);

  // Prepare data for the last 7 days
  const data = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const startOfDayDate = startOfDay(date);
    
    const activeBugs = bugs.filter(bug => {
      const bugDate = new Date(bug.createdAt);
      return startOfDay(bugDate).getTime() === startOfDayDate.getTime();
    });

    return {
      date: format(date, "MMM dd"),
      bugs: activeBugs.length,
    };
  }).reverse();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bug Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bugs"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}