import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFailedJobs, retryFailedJob } from "../services/api";

export function useFailedJobs() {
  return useQuery({
    queryKey: ["failed-jobs"],
    queryFn: getFailedJobs,
  });
}

export function useRetryFailedJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: retryFailedJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["failed-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
    },
  });
}
