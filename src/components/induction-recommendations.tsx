import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle, TrendingUp, Zap } from "lucide-react";

interface RecommendationItem {
  trainId: string;
  trainsetNumber: string;
  priority: "high" | "medium" | "low";
  action: "induct" | "standby" | "maintenance";
  reasoning: string[];
  confidence: number;
}

interface InductionRecommendationsProps {
  recommendations: RecommendationItem[];
  onApprove: (trainId: string) => void;
  onOverride: (trainId: string) => void;
}

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "high": return <TrendingUp className="h-4 w-4" />;
    case "medium": return <Clock className="h-4 w-4" />;
    case "low": return <CheckCircle className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "high": return "bg-critical text-critical-foreground";
    case "medium": return "bg-warning text-warning-foreground";
    case "low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getActionIcon = (action: string) => {
  switch (action) {
    case "induct": return <Zap className="h-4 w-4" />;
    case "standby": return <Clock className="h-4 w-4" />;
    case "maintenance": return <AlertTriangle className="h-4 w-4" />;
    default: return <CheckCircle className="h-4 w-4" />;
  }
};

const getActionVariant = (action: string) => {
  switch (action) {
    case "induct": return "bg-operational text-operational-foreground";
    case "standby": return "bg-secondary text-secondary-foreground";
    case "maintenance": return "bg-maintenance text-maintenance-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function InductionRecommendations({
  recommendations,
  onApprove,
  onOverride
}: InductionRecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          AI Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Optimized induction plan based on current constraints and historical data
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.trainId} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold">{rec.trainsetNumber}</h4>
                  <Badge className={getPriorityVariant(rec.priority)}>
                    <div className="flex items-center gap-1">
                      {getPriorityIcon(rec.priority)}
                      <span className="capitalize">{rec.priority} Priority</span>
                    </div>
                  </Badge>
                  <Badge className={getActionVariant(rec.action)}>
                    <div className="flex items-center gap-1">
                      {getActionIcon(rec.action)}
                      <span className="capitalize">{rec.action}</span>
                    </div>
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    Confidence: {rec.confidence}%
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => onApprove(rec.trainId)}
                      className="bg-success text-success-foreground hover:bg-success/90"
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => onOverride(rec.trainId)}
                    >
                      Override
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-muted-foreground">Reasoning:</h5>
                <ul className="text-sm space-y-1">
                  {rec.reasoning.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 mt-0.5 text-success flex-shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}