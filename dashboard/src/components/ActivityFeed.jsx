import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Wifi, WifiOff } from "lucide-react";
import { socket } from "../socket/socket";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function ActivityFeed() {
  const queryClient = useQueryClient();
  const [connected, setConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
    }

    function onDisconnect() {
      setConnected(false);
    }

    function onJobUpdate(event) {
      queryClient.invalidateQueries({ queryKey: ["metrics"] });
      queryClient.invalidateQueries({ queryKey: ["failed-jobs"] });
      setEvents((current) => [
        {
          ...event,
          id: `${event.jobId}-${Date.now()}`,
          receivedAt: new Date().toLocaleTimeString(),
        },
        ...current,
      ].slice(0, 8));
    }

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("job:update", onJobUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("job:update", onJobUpdate);
    };
  }, [queryClient]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>Realtime Feed</CardTitle>
          <CardDescription>Latest socket job updates</CardDescription>
        </div>
        <Badge variant={connected ? "default" : "secondary"} className="gap-1">
          {connected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {connected ? "Live" : "Offline"}
        </Badge>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-sm text-muted-foreground">
            No realtime events received yet.
          </div>
        ) : (
          <ol className="space-y-3">
            {events.map((event) => (
              <li key={event.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">Job {event.jobId}</span>
                  <span className="text-xs text-muted-foreground">{event.receivedAt}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{event.state}</Badge>
                  {event.reason ? (
                    <span className="text-sm text-muted-foreground">{event.reason}</span>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
