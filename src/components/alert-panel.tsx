import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, XCircle, CheckCircle, Shield, Activity } from "lucide-react";

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
    case "critical": return <XCircle className="h-5 w-5" />;
    case "warning": return <AlertTriangle className="h-5 w-5" />;
    case "info": return <CheckCircle className="h-5 w-5" />;
    default: return <Clock className="h-5 w-5" />;
  }
};

const getAlertBorderStyle = (type: string) => {
  switch (type) {
    case "critical": return "border-l-critical bg-gradient-to-r from-critical/10 to-transparent shadow-glow-critical";
    case "warning": return "border-l-warning bg-gradient-to-r from-warning/10 to-transparent shadow-glow-warning";
    case "info": return "border-l-operational bg-gradient-to-r from-operational/10 to-transparent";
    default: return "border-l-muted bg-gradient-to-r from-muted/10 to-transparent";
  }
};

const getAlertVariant = (type: string) => {
  switch (type) {
    case "critical": return "bg-gradient-critical text-critical-foreground shadow-glow-critical";
    case "warning": return "bg-gradient-warning text-warning-foreground shadow-glow-warning";
    case "info": return "bg-gradient-operational text-operational-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function AlertPanel({ alerts, onAcknowledge, onDismiss }: AlertPanelProps) {
  const criticalAlerts = alerts.filter(alert => alert.type === "critical" && !alert.acknowledged);
  const otherAlerts = alerts.filter(alert => alert.type !== "critical" || alert.acknowledged);

  return (
    <Card className="bg-gradient-surface border-0 shadow-xl animate-fade-in">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl font-bold">
          <div className="p-2 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-3">
            <span>System Alerts</span>
            {criticalAlerts.length > 0 && (
              <Badge className="bg-critical text-critical-foreground shadow-glow-critical animate-pulse-glow px-3 py-1 font-bold">
                {criticalAlerts.length} Critical
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
          {criticalAlerts.length === 0 && otherAlerts.length === 0 ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="bg-gradient-success rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-glow-success">
                <CheckCircle className="h-10 w-10 text-success-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-success mb-2">All Systems Operational</h3>
              <p className="text-muted-foreground">No active alerts detected</p>
            </div>
          ) : (
            <>
              {/* Critical Alerts First */}
              {criticalAlerts.map((alert, index) => (
                <div 
                  key={alert.id} 
                  className={`border-l-4 rounded-r-lg p-4 transition-all duration-300 hover:scale-[1.02] animate-slide-up ${getAlertBorderStyle(alert.type)}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Badge className={getAlertVariant(alert.type) + " px-3 py-1 font-medium"}>
                        <div className="flex items-center gap-1.5">
                          {getAlertIcon(alert.type)}
                          <span className="capitalize font-semibold">{alert.type}</span>
                        </div>
                      </Badge>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-bold text-lg">{alert.title}</h4>
                        <p className="text-muted-foreground font-medium">{alert.description}</p>
                        {alert.trainId && (
                          <div className="bg-primary/10 text-primary px-2 py-1 rounded-md font-mono text-sm w-fit">
                            Train: {alert.trainId}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground font-mono">{alert.timestamp}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onAcknowledge(alert.id)}
                        className="border-2 hover:bg-success/10 hover:border-success transition-all duration-300 font-medium"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ack
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => onDismiss(alert.id)}
                        className="border-2 hover:bg-critical/10 hover:border-critical transition-all duration-300 font-medium"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Other Alerts */}
              {otherAlerts.map((alert, index) => (
                <div 
                  key={alert.id} 
                  className={`border-l-4 rounded-r-lg p-4 transition-all duration-300 hover:scale-[1.02] animate-slide-up ${getAlertBorderStyle(alert.type)} ${
                    alert.acknowledged ? "opacity-60" : ""
                  }`}
                  style={{ animationDelay: `${(criticalAlerts.length + index) * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Badge className={getAlertVariant(alert.type) + " px-3 py-1 font-medium"} variant="outline">
                        <div className="flex items-center gap-1.5">
                          {getAlertIcon(alert.type)}
                          <span className="capitalize">{alert.type}</span>
                        </div>
                      </Badge>
                      <div className="space-y-2 flex-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        {alert.trainId && (
                          <div className="bg-muted/20 text-muted-foreground px-2 py-1 rounded-md font-mono text-xs w-fit">
                            Train: {alert.trainId}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground font-mono">{alert.timestamp}</p>
                      </div>
                    </div>
                    
                    {!alert.acknowledged && (
                      <div className="flex gap-2 ml-4">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onAcknowledge(alert.id)}
                          className="border hover:bg-success/10 transition-all duration-300"
                        >
                          Ack
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => onDismiss(alert.id)}
                          className="border hover:bg-critical/10 transition-all duration-300"
                        >
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
