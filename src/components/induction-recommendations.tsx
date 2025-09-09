import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle, TrendingUp, Zap, Brain, Target } from "lucide-react";

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
    case "medium": return <Target className="h-4 w-4" />;
    case "low": return <CheckCircle className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "high": return "bg-gradient-critical text-critical-foreground shadow-glow-critical";
    case "medium": return "bg-gradient-warning text-warning-foreground shadow-glow-warning";
    case "low": return "bg-gradient-success text-success-foreground shadow-glow-success";
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
    case "induct": return "bg-operational/10 text-operational border-operational/30";
    case "standby": return "bg-secondary/10 text-secondary-foreground border-secondary/30";
    case "maintenance": return "bg-maintenance/10 text-maintenance border-maintenance/30";
    default: return "bg-muted/10 text-muted-foreground border-muted/30";
  }
};

export function InductionRecommendations({
  recommendations,
  onApprove,
  onOverride
}: InductionRecommendationsProps) {
  return (
    <Card className="bg-gradient-surface border-0 shadow-xl animate-fade-in">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl font-bold">
          <div className="p-2 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <div>AI-Powered Recommendations</div>
            <p className="text-sm text-primary-foreground/80 font-normal mt-1">
              Optimized induction plan based on multi-variable analysis
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div 
              key={rec.trainId} 
              className="group relative overflow-hidden border-2 border-border/50 rounded-xl p-6 bg-gradient-surface hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Confidence indicator */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className={`absolute top-3 right-3 w-14 h-14 rounded-full flex items-center justify-center text-xs font-bold ${
                  rec.confidence >= 90 ? 'bg-success/20 text-success' :
                  rec.confidence >= 70 ? 'bg-warning/20 text-warning' :
                  'bg-critical/20 text-critical'
                }`}>
                  {rec.confidence}%
                </div>
              </div>
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <span className="font-mono font-bold text-lg">{rec.trainsetNumber}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityVariant(rec.priority) + " px-3 py-1 font-medium"}>
                      <div className="flex items-center gap-1.5">
                        {getPriorityIcon(rec.priority)}
                        <span className="capitalize">{rec.priority} Priority</span>
                      </div>
                    </Badge>
                    <Badge className={getActionVariant(rec.action) + " px-3 py-1 font-medium border"}>
                      <div className="flex items-center gap-1.5">
                        {getActionIcon(rec.action)}
                        <span className="capitalize font-semibold">{rec.action}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button 
                    size="lg" 
                    onClick={() => onApprove(rec.trainId)}
                    className="bg-gradient-success text-success-foreground hover:shadow-glow-success transition-all duration-300 font-medium px-6"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => onOverride(rec.trainId)}
                    className="border-2 hover:bg-secondary/50 transition-all duration-300 font-medium px-6"
                  >
                    Override
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Analysis & Reasoning:
                </h5>
                <ul className="space-y-2">
                  {rec.reasoning.map((reason, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-success flex-shrink-0" />
                      <span className="font-medium">{reason}</span>
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