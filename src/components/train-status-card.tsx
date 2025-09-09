import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock, Wrench, MapPin, Gauge, Calendar } from "lucide-react";

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
    case "operational": return "bg-gradient-success text-success-foreground shadow-glow-success";
    case "maintenance": return "bg-gradient-warning text-warning-foreground shadow-glow-warning";
    case "standby": return "bg-secondary text-secondary-foreground";
    case "critical": return "bg-gradient-critical text-critical-foreground shadow-glow-critical animate-pulse-glow";
    default: return "bg-muted text-muted-foreground";
  }
};

const getFitnessVariant = (status: string) => {
  switch (status) {
    case "valid": return "bg-success/10 text-success border-success/20";
    case "expiring": return "bg-warning/10 text-warning border-warning/20";
    case "expired": return "bg-critical/10 text-critical border-critical/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getBrandingVariant = (priority: string) => {
  switch (priority) {
    case "high": return "bg-critical/10 text-critical border-critical/20";
    case "medium": return "bg-warning/10 text-warning border-warning/20";
    case "low": return "bg-success/10 text-success border-success/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
  }
};

const getJobCardVariant = (status: string) => {
  switch (status) {
    case "closed": return "bg-success/10 text-success border-success/20";
    case "open": return "bg-critical/10 text-critical border-critical/20";
    case "pending": return "bg-warning/10 text-warning border-warning/20";
    default: return "bg-muted/10 text-muted-foreground border-muted/20";
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
    <Card className="group relative overflow-hidden bg-gradient-surface border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      <CardHeader className="pb-4 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold font-inter tracking-tight flex items-center gap-2">
            <div className="p-1 bg-primary/10 rounded-md">
              <span className="font-mono text-sm">{trainsetNumber}</span>
            </div>
          </CardTitle>
          <Badge className={getStatusVariant(status) + " px-3 py-1 font-medium"}>
            <div className="flex items-center gap-1.5">
              {getStatusIcon(status)}
              <span className="capitalize">{status}</span>
            </div>
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-mono">ID: {trainId}</p>
      </CardHeader>
      
      <CardContent className="space-y-4 relative">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <CheckCircle className="h-3 w-3" />
              Fitness Status
            </div>
            <Badge className={getFitnessVariant(fitnessStatus) + " w-full justify-center font-medium"}>
              {fitnessStatus}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <Wrench className="h-3 w-3" />
              Job Cards
            </div>
            <Badge className={getJobCardVariant(jobCardStatus) + " w-full justify-center font-medium"}>
              {jobCardStatus}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <AlertTriangle className="h-3 w-3" />
              Brand Priority
            </div>
            <Badge className={getBrandingVariant(brandingPriority) + " w-full justify-center font-medium"}>
              {brandingPriority}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <Gauge className="h-3 w-3" />
              Mileage
            </div>
            <div className="font-mono font-semibold text-sm bg-muted/20 rounded-md px-2 py-1 text-center">
              {mileage.toLocaleString()} km
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <Calendar className="h-3 w-3" />
              Cleaning Slot
            </div>
            <div className="font-medium text-sm">
              {cleaningSlot ? (
                <span className="bg-operational/10 text-operational px-2 py-1 rounded-md font-mono text-xs">
                  {cleaningSlot}
                </span>
              ) : (
                <span className="text-muted-foreground text-xs">Not scheduled</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <MapPin className="h-3 w-3" />
              Position
            </div>
            <div className="font-mono font-semibold text-sm bg-primary/10 text-primary px-2 py-1 rounded-md">
              {stablingPosition}
            </div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-border/50 text-xs text-muted-foreground font-mono">
          Last updated: {lastUpdated}
        </div>
      </CardContent>
    </Card>
  );
}