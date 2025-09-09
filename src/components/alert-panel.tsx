import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, XCircle, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  trainId?: string;
  timestamp: string;
  acknowledged: boolean;
}

interface AlertPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case "critical": return <XCircle className="h-4 w-4" />;
    case "warning": return <AlertTriangle className="h-4 w-4" />;
    case "info": return <CheckCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
};

const getAlertVariant = (type: string) => {
  switch (type) {
    case "critical": return "bg-critical text-critical-foreground";
    case "warning": return "bg-warning text-warning-foreground";
    case "info": return "bg-operational text-operational-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function AlertPanel({ alerts, onAcknowledge, onDismiss }: AlertPanelProps) {
  const criticalAlerts = alerts.filter(alert => alert.type === "critical" && !alert.acknowledged);
  const otherAlerts = alerts.filter(alert => alert.type !== "critical" || alert.acknowledged);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          System Alerts
          {criticalAlerts.length > 0 && (
            <Badge className="bg-critical text-critical-foreground">
              {criticalAlerts.length} Critical
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {criticalAlerts.length === 0 && otherAlerts.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-2 text-success" />
              <p>All systems operational</p>
            </div>
          ) : (
            <>
              {/* Critical Alerts First */}
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="border-l-4 border-critical bg-critical/5 p-3 rounded-r">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Badge className={getAlertVariant(alert.type)}>
                        <div className="flex items-center gap-1">
                          {getAlertIcon(alert.type)}
                          <span className="capitalize">{alert.type}</span>
                        </div>
                      </Badge>
                      <div className="space-y-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        {alert.trainId && (
                          <p className="text-xs text-muted-foreground">Train: {alert.trainId}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => onAcknowledge(alert.id)}>
                        Ack
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onDismiss(alert.id)}>
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Other Alerts */}
              {otherAlerts.map((alert) => (
                <div key={alert.id} className={`border-l-4 p-3 rounded-r ${
                  alert.type === "warning" ? "border-warning bg-warning/5" : "border-operational bg-operational/5"
                } ${alert.acknowledged ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <Badge className={getAlertVariant(alert.type)} variant="outline">
                        <div className="flex items-center gap-1">
                          {getAlertIcon(alert.type)}
                          <span className="capitalize">{alert.type}</span>
                        </div>
                      </Badge>
                      <div className="space-y-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        {alert.trainId && (
                          <p className="text-xs text-muted-foreground">Train: {alert.trainId}</p>
                        )}
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                    </div>
                    
                    {!alert.acknowledged && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => onAcknowledge(alert.id)}>
                          Ack
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onDismiss(alert.id)}>
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
