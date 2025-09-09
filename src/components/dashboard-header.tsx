import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Settings, AlertTriangle } from "lucide-react";

interface DashboardHeaderProps {
  totalTrains: number;
  operationalTrains: number;
  maintenanceTrains: number;
  criticalAlerts: number;
  lastSync: string;
  onRefresh: () => void;
}

export function DashboardHeader({
  totalTrains,
  operationalTrains,
  maintenanceTrains,
  criticalAlerts,
  lastSync,
  onRefresh
}: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-primary p-6 text-primary-foreground">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">KMRL Train Induction Planning</h1>
          <p className="text-primary-foreground/80 mt-1">
            AI-Driven Decision Support System
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={onRefresh}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="secondary" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-primary-foreground/10 rounded-lg p-4">
          <div className="text-2xl font-bold">{totalTrains}</div>
          <div className="text-sm text-primary-foreground/80">Total Trainsets</div>
        </div>
        
        <div className="bg-primary-foreground/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{operationalTrains}</div>
          <div className="text-sm text-primary-foreground/80">Operational</div>
        </div>
        
        <div className="bg-primary-foreground/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">{maintenanceTrains}</div>
          <div className="text-sm text-primary-foreground/80">In Maintenance</div>
        </div>
        
        <div className="bg-primary-foreground/10 rounded-lg p-4">
          <div className="flex items-center gap-2">
            {criticalAlerts > 0 && <AlertTriangle className="h-5 w-5 text-red-400" />}
            <div className="text-2xl font-bold text-red-400">{criticalAlerts}</div>
          </div>
          <div className="text-sm text-primary-foreground/80">Critical Alerts</div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-primary-foreground/60">
        Last synchronized: {lastSync}
      </div>
    </div>
  );
}