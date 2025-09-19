import { HourlyItem } from "@/app/lib/types";
import analyzeWeatherData from "@/utils/generateWeatherAlerts";
import Card from "./ui/Card";

interface AlertsPanelProps {
  forecast: HourlyItem[];
}

export default function AlertsPanel({ forecast }: AlertsPanelProps) {
  const alerts = analyzeWeatherData(forecast);

  return alerts.length > 0 ? (
    <div className="foo">
      {alerts.map((a, idx) => (
        <div className="flex flex-col gap-2" key={idx}>
          <Card variant="alert">{a.message}</Card>
        </div>
      ))}
    </div>
  ) : null;
}
