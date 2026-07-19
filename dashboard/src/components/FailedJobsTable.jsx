import { RefreshCw } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function statusVariant(status) {
  if (status === "retried") return "default";
  if (status === "pending") return "secondary";
  return "outline";
}

export default function FailedJobsTable({ jobs = [], onRetry, retryingId }) {
  if (!jobs.length) {
    return (
      <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
        No failed jobs found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Original Job</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Failed At</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.originalJobId}</TableCell>
            <TableCell>
              <Badge variant={statusVariant(job.status)}>{job.status || "unknown"}</Badge>
            </TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {job.failedAt ? new Date(job.failedAt).toLocaleString() : "-"}
            </TableCell>
            <TableCell className="max-w-md">
              <span className="line-clamp-2 text-muted-foreground">
                {job.failedReason || "No failure reason captured"}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
                disabled={retryingId === job.originalJobId}
                onClick={() => onRetry(job.originalJobId)}
              >
                <RefreshCw
                  className={`h-4 w-4 ${retryingId === job.originalJobId ? "animate-spin" : ""}`}
                />
                Retry
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
