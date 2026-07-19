import ActivityFeed from "../components/ActivityFeed";
import JobExplorer from "../components/JobExplorer";
import JobsChart from "../components/JobsChart";
import MetricsCards from "../components/MetricsCards";
import { useMetrics } from "../hooks/useMetrics";

export default function Dashboard() {
  const { data, isLoading, isError, error } = useMetrics();

  return (
    <div className="space-y-6">
      {isError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error.message}
        </div>
      ) : null}

      <MetricsCards data={data} isLoading={isLoading} />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.8fr)]">
        <JobsChart metrics={data} />
        <ActivityFeed />
      </section>

      <JobExplorer />
    </div>
  );
}
