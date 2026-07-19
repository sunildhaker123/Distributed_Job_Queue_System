const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export function getMetrics() {
  return request("/api/metrics");
}

export function getFailedJobs() {
  return request("/api/failed-jobs");
}

export function retryFailedJob(jobId) {
  return request(`/api/failed-jobs/${jobId}/retry`);
}

export function getJob(jobId) {
  return request(`/api/jobs/${jobId}`);
}
