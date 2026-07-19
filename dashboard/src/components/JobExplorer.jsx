import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getJob } from "../services/api";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export default function JobExplorer() {
  const [jobId, setJobId] = useState("");
  const [submittedId, setSubmittedId] = useState("");
  const query = useQuery({
    queryKey: ["job", submittedId],
    queryFn: () => getJob(submittedId),
    enabled: Boolean(submittedId),
    retry: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedId(jobId.trim());
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Explorer</CardTitle>
        <CardDescription>Search by BullMQ job ID</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
          <Input
            value={jobId}
            onChange={(event) => setJobId(event.target.value)}
            placeholder="Enter job ID"
          />
          <Button type="submit" disabled={!jobId.trim() || query.isFetching}>
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>

        {query.isError ? (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {query.error.message}
          </div>
        ) : null}

        {query.data ? (
          <div className="space-y-3 rounded-md border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium">Job {query.data.id}</span>
              <Badge variant="secondary">{query.data.state}</Badge>
            </div>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Attempts</dt>
                <dd className="font-medium">{query.data.attemptsMade ?? 0}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Progress</dt>
                <dd className="font-medium">{query.data.progress ?? 0}%</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Failure Reason</dt>
                <dd className="font-medium">{query.data.failedReason || "None"}</dd>
              </div>
            </dl>
            <pre className="max-h-56 overflow-auto rounded-md bg-muted p-3 text-xs">
              {JSON.stringify(query.data.data, null, 2)}
            </pre>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
