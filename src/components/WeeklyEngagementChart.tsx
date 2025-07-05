import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WeeklyData {
  day: string;
  value: number;
  label: string;
}

export const WeeklyEngagementChart = () => {
  const weeklyData: WeeklyData[] = [
    { day: "M", value: 42, label: "Mon" },
    { day: "T", value: 38, label: "Tue" },
    { day: "W", value: 55, label: "Wed" },
    { day: "T", value: 48, label: "Thu" },
    { day: "F", value: 62, label: "Fri" },
    { day: "S", value: 35, label: "Sat" },
    { day: "S", value: 41, label: "Sun" },
  ];

  const maxValue = Math.max(...weeklyData.map(d => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Weekly Engagement
          <Badge variant="secondary" className="bg-success/10 text-success">
            +33.3%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-32 space-x-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="bg-gradient-to-t from-primary to-primary-glow rounded-t w-full transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${(day.value / maxValue) * 100}%`, 
                  minHeight: '12px' 
                }}
              />
              <div className="text-xs text-center mt-2">
                <div className="font-medium">{day.value}</div>
                <div className="text-muted-foreground">{day.day}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-semibold text-primary">345</div>
              <div className="text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="font-semibold text-success">49.3</div>
              <div className="text-muted-foreground">Avg</div>
            </div>
            <div>
              <div className="font-semibold text-warning">62</div>
              <div className="text-muted-foreground">Peak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};