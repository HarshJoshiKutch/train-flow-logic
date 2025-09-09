import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock, Wrench, MapPin } from "lucide-react";

interface TrainStatusCardProps {
  trainId: string;
  trainsetNumber: string;
  status: "operational" | "maintenance" | "standby" | "critical";
  fitnessStatus: "valid" | "expiring" | "expired";
  jobCardStatus: "closed" | "open" | "pending";
  brandingPriority: "high" | "medium" | "low";
  mileage: number;
  cleaningSlot: string | null;
  stablingPosition: string;
  lastUpdated: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational": return <CheckCircle className="h-4 w-4" />;
    case "maintenance": return <Wrench className="h-4 w-4" />;
    case "standby": return <Clock className="h-4 w-4" />;
    case "critical": return <XCircle className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "operational": return "bg-success text-success-foreground";
    case "maintenance": return "bg-maintenance text-maintenance-foreground";
    case "standby": return "bg-secondary text-secondary-foreground";
    case "critical": return "bg-critical text-critical-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getFitnessVariant = (status: string) => {
  switch (status) {
    case "valid": return "bg-success text-success-foreground";
    case "expiring": return "bg-warning text-warning-foreground";
    case "expired": return "bg-critical text-critical-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getBrandingVariant = (priority: string) => {
  switch (priority) {
    case "high": return "bg-critical text-critical-foreground";
    case "medium": return "bg-warning text-warning-foreground";
    case "low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function TrainStatusCard({
  trainId,
  trainsetNumber,
  status,
  fitnessStatus,
  jobCardStatus,
  brandingPriority,
  mileage,
  cleaningSlot,
  stablingPosition,
  lastUpdated
}: TrainStatusCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{trainsetNumber}</CardTitle>
          <Badge className={getStatusVariant(status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(status)}
              <span className="capitalize">{status}</span>
            </div>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Train ID: {trainId}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <span className="text-muted-foreground">Fitness Status</span>
            <Badge className={getFitnessVariant(fitnessStatus)} variant="outline">
              {fitnessStatus}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <span className="text-muted-foreground">Job Cards</span>
            <Badge 
              className={jobCardStatus === "closed" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}
              variant="outline"
            >
              {jobCardStatus}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <span className="text-muted-foreground">Branding Priority</span>
            <Badge className={getBrandingVariant(brandingPriority)} variant="outline">
              {brandingPriority}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <span className="text-muted-foreground">Mileage</span>
            <div className="font-medium">{mileage.toLocaleString()} km</div>
          </div>
          
          <div className="space-y-1">
            <span className="text-muted-foreground">Cleaning Slot</span>
            <div className="font-medium">{cleaningSlot || "Not scheduled"}</div>
          </div>
          
          <div className="space-y-1 flex items-center gap-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <div>
              <span className="text-muted-foreground text-xs">Position</span>
              <div className="font-medium text-sm">{stablingPosition}</div>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
}