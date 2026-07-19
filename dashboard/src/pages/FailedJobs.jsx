import { AlertTriangle } from "lucide-react";
import FailedJobsTable from "../components/FailedJobsTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useFailedJobs, useRetryFailedJob } from "../hooks/useFailedJobs";

export default function FailedJobs() {
  const { data = [], isLoading, isError, error } = useFailedJobs();
  const retryMutation = useRetryFailedJob();
  const retryingId = retryMutation.variables;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Failed Jobs</CardTitle>
            <CardDescription>Review failures and requeue jobs</CardDescription>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          {isError ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error.message}
            </div>
          ) : null}

          {retryMutation.isError ? (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {retryMutation.error.message}
            </div>
          ) : null}

          {retryMutation.isSuccess ? (
            <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              Retry initiated for job {retryMutation.data.jobId}.
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
              Loading failed jobs...
            </div>
          ) : (
            <FailedJobsTable
              jobs={data}
              retryingId={retryingId}
              onRetry={(jobId) => retryMutation.mutate(jobId)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
