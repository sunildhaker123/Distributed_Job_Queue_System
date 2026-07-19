import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function JobsChart({ metrics }) {
  const chartData = ["completed", "failed", "waiting", "active", "delayed"].map(
    (key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      count: metrics?.[key] ?? 0,
    }),
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Queue Snapshot</CardTitle>
        <CardDescription>Current BullMQ job counts by state</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "rgba(15, 23, 42, 0.06)" }} />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
