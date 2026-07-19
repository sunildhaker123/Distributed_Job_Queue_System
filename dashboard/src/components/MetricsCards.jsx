import {
  Activity,
  CheckCircle2,
  Clock3,
  PauseCircle,
  RotateCw,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const metrics = [
  { key: "waiting", label: "Waiting", icon: Clock3, tone: "text-amber-600" },
  { key: "active", label: "Active", icon: Activity, tone: "text-teal-600" },
  { key: "completed", label: "Completed", icon: CheckCircle2, tone: "text-emerald-600" },
  { key: "failed", label: "Failed", icon: XCircle, tone: "text-red-600" },
  { key: "delayed", label: "Delayed", icon: PauseCircle, tone: "text-indigo-600" },
];

export default function MetricsCards({ data, isLoading }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {metrics.map((metric) => (
        <Card key={metric.key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              {metric.label}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.tone}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              {isLoading ? <RotateCw className="h-6 w-6 animate-spin" /> : data?.[metric.key] ?? 0}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
