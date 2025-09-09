import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { TrainStatusCard } from "@/components/train-status-card";
import { InductionRecommendations } from "@/components/induction-recommendations";
import { AlertPanel } from "@/components/alert-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockTrains = [
  {
    trainId: "KMRL-001",
    trainsetNumber: "KTR-001",
    status: "operational" as const,
    fitnessStatus: "valid" as const,
    jobCardStatus: "closed" as const,
    brandingPriority: "high" as const,
    mileage: 45230,
    cleaningSlot: "Bay-A 22:00",
    stablingPosition: "Track-1-A",
    lastUpdated: "2024-01-15 21:45:32"
  },
  {
    trainId: "KMRL-002",
    trainsetNumber: "KTR-002",
    status: "maintenance" as const,
    fitnessStatus: "expiring" as const,
    jobCardStatus: "open" as const,
    brandingPriority: "medium" as const,
    mileage: 52100,
    cleaningSlot: null,
    stablingPosition: "IBL-2",
    lastUpdated: "2024-01-15 21:30:15"
  },
  {
    trainId: "KMRL-003",
    trainsetNumber: "KTR-003",
    status: "standby" as const,
    fitnessStatus: "valid" as const,
    jobCardStatus: "closed" as const,
    brandingPriority: "low" as const,
    mileage: 38450,
    cleaningSlot: "Bay-B 23:30",
    stablingPosition: "Track-2-B",
    lastUpdated: "2024-01-15 21:42:10"
  },
  {
    trainId: "KMRL-004",
    trainsetNumber: "KTR-004",
    status: "critical" as const,
    fitnessStatus: "expired" as const,
    jobCardStatus: "open" as const,
    brandingPriority: "high" as const,
    mileage: 61200,
    cleaningSlot: null,
    stablingPosition: "IBL-1",
    lastUpdated: "2024-01-15 21:15:05"
  },
  {
    trainId: "KMRL-005",
    trainsetNumber: "KTR-005",
    status: "operational" as const,
    fitnessStatus: "valid" as const,
    jobCardStatus: "closed" as const,
    brandingPriority: "medium" as const,
    mileage: 42800,
    cleaningSlot: "Bay-A 00:30",
    stablingPosition: "Track-1-C",
    lastUpdated: "2024-01-15 21:50:22"
  }
];

const mockRecommendations = [
  {
    trainId: "KMRL-001",
    trainsetNumber: "KTR-001",
    priority: "high" as const,
    action: "induct" as const,
    reasoning: [
      "Valid fitness certificates for all systems",
      "High branding priority contract requirement",
      "Optimal mileage distribution",
      "Minimal shunting required from current position"
    ],
    confidence: 95
  },
  {
    trainId: "KMRL-003",
    trainsetNumber: "KTR-003",
    priority: "medium" as const,
    action: "induct" as const,
    reasoning: [
      "All maintenance work completed",
      "Cleaning scheduled and completed",
      "Good position for morning departure"
    ],
    confidence: 87
  },
  {
    trainId: "KMRL-002",
    trainsetNumber: "KTR-002",
    priority: "low" as const,
    action: "maintenance" as const,
    reasoning: [
      "Open job cards require attention",
      "Fitness certificate expiring in 2 days",
      "Currently positioned in IBL"
    ],
    confidence: 92
  }
];

const mockAlerts = [
  {
    id: "alert-001",
    type: "critical" as const,
    title: "Fitness Certificate Expired",
    description: "KTR-004 telecom clearance expired 3 hours ago",
    trainId: "KMRL-004",
    timestamp: "2024-01-15 21:15:05",
    acknowledged: false
  },
  {
    id: "alert-002",
    type: "warning" as const,
    title: "Job Card Status Update",
    description: "KTR-002 has 2 open maintenance work orders",
    trainId: "KMRL-002",
    timestamp: "2024-01-15 21:30:15",
    acknowledged: false
  },
  {
    id: "alert-003",
    type: "info" as const,
    title: "Cleaning Complete",
    description: "KTR-003 deep cleaning completed successfully",
    trainId: "KMRL-003",
    timestamp: "2024-01-15 21:42:10",
    acknowledged: true
  }
];

const Index = () => {
  const [trains, setTrains] = useState(mockTrains);
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lastSync, setLastSync] = useState(new Date().toLocaleString());
  const { toast } = useToast();

  const filteredTrains = trains.filter(train => {
    const matchesSearch = train.trainsetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.trainId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || train.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const operationalCount = trains.filter(t => t.status === "operational").length;
  const maintenanceCount = trains.filter(t => t.status === "maintenance").length;
  const criticalAlertCount = alerts.filter(a => a.type === "critical" && !a.acknowledged).length;

  const handleRefresh = () => {
    setLastSync(new Date().toLocaleString());
    toast({
      title: "Data Refreshed",
      description: "All train data synchronized successfully",
    });
  };

  const handleApproveRecommendation = (trainId: string) => {
    toast({
      title: "Recommendation Approved",
      description: `Induction plan approved for ${trainId}`,
    });
  };

  const handleOverrideRecommendation = (trainId: string) => {
    toast({
      title: "Manual Override",
      description: `Manual override requested for ${trainId}`,
      variant: "destructive",
    });
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been acknowledged",
    });
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Dismissed",
      description: "Alert has been dismissed",
    });
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastSync(new Date().toLocaleString());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        totalTrains={trains.length}
        operationalTrains={operationalCount}
        maintenanceTrains={maintenanceCount}
        criticalAlerts={criticalAlertCount}
        lastSync={lastSync}
        onRefresh={handleRefresh}
      />
      
      <div className="container mx-auto p-6 space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search trains..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="standby">Standby</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrains.map((train) => (
                <TrainStatusCard key={train.trainId} {...train} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6">
            <InductionRecommendations
              recommendations={recommendations}
              onApprove={handleApproveRecommendation}
              onOverride={handleOverrideRecommendation}
            />
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <AlertPanel
              alerts={alerts}
              onAcknowledge={handleAcknowledgeAlert}
              onDismiss={handleDismissAlert}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;