import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Brain, 
  Zap, 
  Target,
  Activity,
  Users,
  Clock,
  Star,
  Award,
  TrendingDown,
  Minus,
  Loader2,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
}

interface ChartData {
  id: string;
  title: string;
  type: 'bar' | 'pie' | 'line' | 'area' | 'donut';
  data: DataPoint[];
  insights: string[];
  generatedAt: Date;
}

interface AIDataVisualsProps {
  className?: string;
}

const SAMPLE_DATA: DataPoint[] = [
  { label: 'Frontend Development', value: 85, color: '#3B82F6', trend: 'up', change: 12 },
  { label: 'Backend Development', value: 78, color: '#10B981', trend: 'up', change: 8 },
  { label: 'UI/UX Design', value: 92, color: '#8B5CF6', trend: 'up', change: 15 },
  { label: 'Project Management', value: 70, color: '#F59E0B', trend: 'stable', change: 2 },
  { label: 'DevOps', value: 65, color: '#EF4444', trend: 'down', change: -5 }
];

const CHART_TYPES = [
  { value: 'bar', label: 'Bar Chart', icon: <BarChart3 className="w-4 h-4" /> },
  { value: 'pie', label: 'Pie Chart', icon: <PieChart className="w-4 h-4" /> },
  { value: 'line', label: 'Line Chart', icon: <TrendingUp className="w-4 h-4" /> },
  { value: 'area', label: 'Area Chart', icon: <Activity className="w-4 h-4" /> },
  { value: 'donut', label: 'Donut Chart', icon: <Target className="w-4 h-4" /> }
];

export const AIDataVisuals: React.FC<AIDataVisualsProps> = ({ className = '' }) => {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('bar');
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  const generateChart = async (type: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
    
    const insights = [
      "Your frontend skills show strong growth potential",
      "Consider focusing more on DevOps to become full-stack",
      "Your UI/UX expertise is exceptional - leverage it!",
      "Project management skills are solid but could improve",
      "Backend development shows steady progress"
    ];

    const newChart: ChartData = {
      id: Date.now().toString(),
      title: `AI-Generated ${CHART_TYPES.find(t => t.value === type)?.label}`,
      type: type as any,
      data: SAMPLE_DATA.map(item => ({
        ...item,
        value: Math.max(0, Math.min(100, item.value + (Math.random() - 0.5) * 20))
      })),
      insights: insights.sort(() => Math.random() - 0.5).slice(0, 3),
      generatedAt: new Date()
    };

    setCharts(prev => [newChart, ...prev.slice(0, 4)]);
    setIsGenerating(false);
  };

  const animateValue = (key: string, targetValue: number) => {
    const startValue = animatedValues[key] || 0;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = startValue + (targetValue - startValue) * progress;
      
      setAnimatedValues(prev => ({ ...prev, [key]: currentValue }));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Animate existing chart values
    charts.forEach(chart => {
      chart.data.forEach((point, index) => {
        const key = `${chart.id}-${index}`;
        if (!(key in animatedValues)) {
          animateValue(key, point.value);
        }
      });
    });
  }, [charts]);

  const renderBarChart = (data: DataPoint[]) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="space-y-3">
        {data.map((point, index) => {
          const key = `bar-${index}`;
          const animatedValue = animatedValues[key] || 0;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{point.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: point.color }}>
                    {Math.round(animatedValue)}%
                  </span>
                  {point.trend && (
                    <div className={`flex items-center gap-1 ${
                      point.trend === 'up' ? 'text-green-600' :
                      point.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {point.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                       point.trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
                       <Minus className="w-3 h-3" />}
                      <span className="text-xs">{Math.abs(point.change || 0)}%</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ backgroundColor: point.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(animatedValue / maxValue) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderPieChart = (data: DataPoint[]) => {
    const total = data.reduce((sum, point) => sum + point.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {data.map((point, index) => {
            const percentage = (point.value / total) * 100;
            const startAngle = (cumulativePercentage / 100) * 360;
            const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
            
            const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArcFlag = percentage > 50 ? 1 : 0;
            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');

            cumulativePercentage += percentage;

            return (
              <motion.path
                key={index}
                d={pathData}
                fill={point.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">Skills</div>
            <div className="text-sm text-muted-foreground">Portfolio</div>
          </div>
        </div>
      </div>
    );
  };

  const renderChart = (chart: ChartData) => {
    switch (chart.type) {
      case 'bar':
        return renderBarChart(chart.data);
      case 'pie':
        return renderPieChart(chart.data);
      default:
        return renderBarChart(chart.data);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Data Visuals</h3>
            <p className="text-sm text-muted-foreground">AI-powered analytics and insights</p>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      {/* Chart Generator */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CHART_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      {type.icon}
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            onClick={() => generateChart(selectedType)}
            disabled={isGenerating}
            className="bg-gradient-primary hover:bg-gradient-primary/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Chart
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Generated Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart) => (
          <motion.div
            key={chart.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-gradient-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">{chart.title}</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {chart.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {chart.generatedAt.toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div className="mb-4">
                {renderChart(chart)}
              </div>

              {/* AI Insights */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  AI Insights
                </h5>
                {chart.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-2 bg-purple-50 border border-purple-200 rounded-lg"
                  >
                    <p className="text-sm text-purple-800">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {charts.length === 0 && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Generate Your First AI Chart
          </h3>
          <p className="text-muted-foreground mb-4">
            Use AI to create beautiful data visualizations and get insights about your portfolio performance.
          </p>
          <Button
            onClick={() => generateChart(selectedType)}
            disabled={isGenerating}
            className="bg-gradient-primary hover:bg-gradient-primary/90"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Generate Chart
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Charts Generated', value: charts.length, icon: <BarChart3 className="w-4 h-4" />, color: 'text-blue-500' },
          { label: 'AI Insights', value: charts.reduce((sum, chart) => sum + chart.insights.length, 0), icon: <Brain className="w-4 h-4" />, color: 'text-purple-500' },
          { label: 'Data Points', value: charts.reduce((sum, chart) => sum + chart.data.length, 0), icon: <Target className="w-4 h-4" />, color: 'text-green-500' },
          { label: 'Accuracy', value: '95%', icon: <Award className="w-4 h-4" />, color: 'text-yellow-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-4 text-center">
              <div className={`w-8 h-8 mx-auto mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
