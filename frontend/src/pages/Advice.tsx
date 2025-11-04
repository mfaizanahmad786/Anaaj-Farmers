import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  CloudRain, 
  Sun, 
  Droplets,
  AlertTriangle,
  CheckCircle,
  Clock,
  Leaf,
  DollarSign,
  Calendar
} from 'lucide-react';

interface Advice {
  category: 'weather' | 'price' | 'seasonal' | 'general';
  type: 'optimal' | 'warning' | 'sell' | 'hold' | 'info' | 'watering';
  icon: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  itemName?: string;
}

const Advice = () => {
  const [selectedRegion] = useState('Punjab');
  const [selectedCity] = useState('Lahore');

  // Mock data based on API documentation
  const dailyAdviceData = {
    date: new Date().toISOString(),
    city: selectedCity,
    region: selectedRegion,
    aiPowered: true,
    weather: {
      temperature: 28,
      condition: 'Clear',
      humidity: 65,
      advice: [
        {
          category: 'weather' as const,
          type: 'optimal' as const,
          icon: '✅',
          title: 'Perfect Farming Conditions',
          message: 'Excellent weather for field work. Good day for planting and harvesting.',
          priority: 'low' as const
        },
        {
          category: 'weather' as const,
          type: 'watering' as const,
          icon: '💧',
          title: 'Maintain Regular Watering',
          message: 'Clear skies and moderate temperature. Continue regular irrigation schedule.',
          priority: 'medium' as const
        }
      ]
    },
    priceAnalysis: {
      totalItemsAnalyzed: 25,
      sellingOpportunities: [
        {
          name: 'Tomato',
          currentPrice: 120,
          trend: {
            changePercentage: 15.5,
            direction: 'up' as const,
            isConsistentlyIncreasing: true
          }
        },
        {
          name: 'Onion',
          currentPrice: 80,
          trend: {
            changePercentage: 12.3,
            direction: 'up' as const
          }
        }
      ],
      holdingOpportunities: [
        {
          name: 'Potato',
          currentPrice: 50,
          trend: {
            changePercentage: -8.5,
            direction: 'down' as const
          }
        }
      ],
      advice: [
        {
          category: 'price' as const,
          type: 'sell' as const,
          icon: '📈',
          title: 'Consider Selling Tomato',
          message: 'Price has increased by 15.5% over 7 days. Good time to sell.',
          priority: 'high' as const,
          itemName: 'Tomato'
        },
        {
          category: 'price' as const,
          type: 'hold' as const,
          icon: '📉',
          title: 'Hold Potato Stock',
          message: 'Prices declining by 8.5%. Wait for market recovery before selling.',
          priority: 'medium' as const,
          itemName: 'Potato'
        }
      ]
    },
    aiInsights: {
      summary: 'Favorable weather and strong tomato prices today',
      topPriorities: [
        'Sell tomatoes at current high prices',
        'Plant winter vegetables',
        'Monitor potato prices'
      ],
      weatherInsights: {
        impact: 'Clear weather ideal for harvesting',
        recommendations: [
          'Continue regular watering schedule',
          'Apply fertilizer to winter crops',
          'Monitor for pests in dry conditions'
        ]
      },
      marketInsights: {
        hotItems: ['Tomato', 'Onion'],
        holdItems: ['Potato'],
        opportunities: 'Strong demand for vegetables in urban markets'
      },
      farmingTips: [
        'Prepare land for spring planting',
        'Check irrigation systems',
        'Store harvested crops properly'
      ]
    }
  };

  // Seasonal advice mock data
  const seasonalData = {
    season: 'winter',
    month: new Date().getMonth() + 1,
    crops: ['Wheat', 'Potato', 'Tomato', 'Peas', 'Carrot', 'Cauliflower'],
    advice: 'Winter season is ideal for growing wheat and winter vegetables. Protect crops from frost.'
  };

  // Combine all advice
  const allAdvice: Advice[] = [
    ...dailyAdviceData.weather.advice,
    ...dailyAdviceData.priceAnalysis.advice
  ];

  // Separate by priority
  const highPriorityAdvice = allAdvice.filter(a => a.priority === 'high');

  const getAdviceIcon = (type: string) => {
    switch (type) {
      case 'optimal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'sell':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'hold':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'watering':
        return <Droplets className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return variants[priority as keyof typeof variants] || variants.low;
  };

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-semibold">Smart Farmer Advice</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered recommendations for {selectedCity}, {selectedRegion}
          </p>
        </div>
        <Badge className="bg-purple-100 text-purple-700 px-3 py-1">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* Summary Card */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Sun className="w-6 h-6 text-gray-700" />
            Today's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 mb-4">{dailyAdviceData.aiInsights.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-500 mb-1">Temperature</p>
              <p className="text-2xl font-bold text-gray-900">{dailyAdviceData.weather.temperature}°C</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Weather</p>
              <p className="text-2xl font-bold text-gray-900">{dailyAdviceData.weather.condition}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Advice</p>
              <p className="text-2xl font-bold text-gray-900">{allAdvice.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selling Opportunities */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Selling Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyAdviceData.priceAnalysis.sellingOpportunities.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Rs. {item.currentPrice}/{item.name === 'Tomato' ? 'kg' : 'kg'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-semibold text-sm">{item.trend.changePercentage}%</span>
                    </div>
                    <p className="text-xs text-gray-500">7 days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Holding Opportunities */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-orange-500" />
              Hold & Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyAdviceData.priceAnalysis.holdingOpportunities.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Rs. {item.currentPrice}/kg</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-orange-600">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-semibold text-sm">{Math.abs(item.trend.changePercentage)}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Declining</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Priorities */}
      

      {/* High Priority Advice */}
      {highPriorityAdvice.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            High Priority Advice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highPriorityAdvice.map((advice, index) => (
              <Card key={index} className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    {getAdviceIcon(advice.type)}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{advice.title}</h3>
                        <Badge className={getPriorityBadge(advice.priority)}>
                          {getPriorityLabel(advice.priority)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{advice.message}</p>
                      {advice.itemName && (
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {advice.itemName}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Weather Insights and Seasonal Planting Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Insights */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-500" />
              Weather Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-3">
              {dailyAdviceData.aiInsights.weatherInsights.impact}
            </p>
            <ul className="space-y-2">
              {dailyAdviceData.aiInsights.weatherInsights.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Seasonal Planting */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Seasonal Planting Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-100 text-purple-700 capitalize">
                  {seasonalData.season}
                </Badge>
                <span className="text-sm text-gray-500">
                  Month: {seasonalData.month}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{seasonalData.advice}</p>
              <div>
                <p className="text-xs text-gray-500 mb-2">Recommended Crops:</p>
                <div className="flex flex-wrap gap-2">
                  {seasonalData.crops.map((crop, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Leaf className="w-3 h-3" />
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Farming Tips */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-500" />
            General Farming Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {dailyAdviceData.aiInsights.farmingTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Advice;

