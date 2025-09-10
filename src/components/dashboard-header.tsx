import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Settings, AlertTriangle, TrendingUp, Activity, Train } from "lucide-react";

interface DashboardHeaderProps {
  totalTrains: number;
  operationalTrains: number;
  maintenanceTrains: number;
  criticalAlerts: number;
  lastSync: string;
  onRefresh: () => void;
  onSettings?: () => void;
}

export function DashboardHeader({
  totalTrains,
  operationalTrains,
  maintenanceTrains,
  criticalAlerts,
  lastSync,
  onRefresh,
  onSettings
}: DashboardHeaderProps) {
  return (
    <div className="relative bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzMzMzMzMzMzIiBmaWxsLW9wYWNpdHk9IjAuMDUiPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+CjwvZz4KPC9nPgo8L3N2Zz4=')] opacity-20"></div>
      
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
                <Train className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary-foreground font-inter tracking-tight">
                  KMRL Operations Center
                </h1>
                <p className="text-primary-foreground/80 text-lg font-medium">
                  AI-Driven Train Induction Planning System
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={onRefresh}
              className="glass backdrop-blur-md hover:shadow-glow transition-all duration-300 group"
            >
              <RefreshCcw className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
              Refresh Data
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={onSettings}
              className="glass backdrop-blur-md hover:shadow-glow transition-all duration-300"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="group relative overflow-hidden rounded-2xl p-6 glass backdrop-blur-md hover:shadow-glow transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-primary-foreground font-mono">{totalTrains}</div>
                <Train className="h-6 w-6 text-primary-foreground/60" />
              </div>
              <div className="text-sm text-primary-foreground/80 font-medium">Total Trainsets</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl p-6 glass backdrop-blur-md hover:shadow-glow-success transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-success opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-primary-foreground font-mono">{operationalTrains}</div>
                <Activity className="h-6 w-6 text-green-400 animate-pulse-glow" />
              </div>
              <div className="text-sm text-primary-foreground/80 font-medium">Operational</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl p-6 glass backdrop-blur-md hover:shadow-glow-warning transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-warning opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-primary-foreground font-mono">{maintenanceTrains}</div>
                <Settings className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-sm text-primary-foreground/80 font-medium">In Maintenance</div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl p-6 glass backdrop-blur-md hover:shadow-glow-critical transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-critical opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {criticalAlerts > 0 && <AlertTriangle className="h-6 w-6 text-red-400 animate-pulse-glow" />}
                  <div className="text-3xl font-bold text-primary-foreground font-mono">{criticalAlerts}</div>
                </div>
                <TrendingUp className="h-6 w-6 text-red-400" />
              </div>
              <div className="text-sm text-primary-foreground/80 font-medium">Critical Alerts</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-primary-foreground/60 font-mono">
            Last synchronized: {lastSync}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse-glow"></div>
            <span className="text-sm text-primary-foreground/80 font-medium">System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}