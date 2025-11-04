import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  DollarSign,
  BarChart3
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface PriceData {
  date: string;
  price: number;
  day: string;
}

interface CropData {
  id: number;
  name: string;
  category: string;
  currentPrice: number;
  unit: string;
  marketStatus: string;
  priceHistory: PriceData[];
}

const CropTrend = () => {
  const { cropId } = useParams<{ cropId: string }>();
  const navigate = useNavigate();

  // Mock crop data with 7-day price history
  const cropsDatabase: CropData[] = [
    {
      id: 1,
      name: 'Wheat',
      category: 'Grain',
      currentPrice: 85,
      unit: 'kg',
      marketStatus: 'Rising',
      priceHistory: [
        { date: '2024-10-28', price: 75, day: 'Mon' },
        { date: '2024-10-29', price: 77, day: 'Tue' },
        { date: '2024-10-30', price: 79, day: 'Wed' },
        { date: '2024-10-31', price: 80, day: 'Thu' },
        { date: '2024-11-01', price: 82, day: 'Fri' },
        { date: '2024-11-02', price: 83, day: 'Sat' },
        { date: '2024-11-03', price: 85, day: 'Sun' },
      ]
    },
    {
      id: 2,
      name: 'Rice',
      category: 'Grain',
      currentPrice: 120,
      unit: 'kg',
      marketStatus: 'Stable',
      priceHistory: [
        { date: '2024-10-28', price: 118, day: 'Mon' },
        { date: '2024-10-29', price: 119, day: 'Tue' },
        { date: '2024-10-30', price: 120, day: 'Wed' },
        { date: '2024-10-31', price: 119, day: 'Thu' },
        { date: '2024-11-01', price: 120, day: 'Fri' },
        { date: '2024-11-02', price: 121, day: 'Sat' },
        { date: '2024-11-03', price: 120, day: 'Sun' },
      ]
    },
    {
      id: 3,
      name: 'Tomato',
      category: 'Vegetable',
      currentPrice: 65,
      unit: 'kg',
      marketStatus: 'Declining',
      priceHistory: [
        { date: '2024-10-28', price: 80, day: 'Mon' },
        { date: '2024-10-29', price: 76, day: 'Tue' },
        { date: '2024-10-30', price: 73, day: 'Wed' },
        { date: '2024-10-31', price: 70, day: 'Thu' },
        { date: '2024-11-01', price: 68, day: 'Fri' },
        { date: '2024-11-02', price: 66, day: 'Sat' },
        { date: '2024-11-03', price: 65, day: 'Sun' },
      ]
    },
    {
      id: 4,
      name: 'Potato',
      category: 'Vegetable',
      currentPrice: 45,
      unit: 'kg',
      marketStatus: 'Rising',
      priceHistory: [
        { date: '2024-10-28', price: 38, day: 'Mon' },
        { date: '2024-10-29', price: 40, day: 'Tue' },
        { date: '2024-10-30', price: 41, day: 'Wed' },
        { date: '2024-10-31', price: 42, day: 'Thu' },
        { date: '2024-11-01', price: 43, day: 'Fri' },
        { date: '2024-11-02', price: 44, day: 'Sat' },
        { date: '2024-11-03', price: 45, day: 'Sun' },
      ]
    },
    {
      id: 5,
      name: 'Onion',
      category: 'Vegetable',
      currentPrice: 55,
      unit: 'kg',
      marketStatus: 'Stable',
      priceHistory: [
        { date: '2024-10-28', price: 54, day: 'Mon' },
        { date: '2024-10-29', price: 55, day: 'Tue' },
        { date: '2024-10-30', price: 56, day: 'Wed' },
        { date: '2024-10-31', price: 55, day: 'Thu' },
        { date: '2024-11-01', price: 54, day: 'Fri' },
        { date: '2024-11-02', price: 55, day: 'Sat' },
        { date: '2024-11-03', price: 55, day: 'Sun' },
      ]
    },
  ];

  const crop = cropsDatabase.find(c => c.id === parseInt(cropId || '0'));

  if (!crop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Crop not found</p>
            <Button onClick={() => navigate('/crops')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Crops
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate price statistics
  const prices = crop.priceHistory.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const priceChange = crop.currentPrice - crop.priceHistory[0].price;
  const priceChangePercent = ((priceChange / crop.priceHistory[0].price) * 100).toFixed(2);

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-900">
            {payload[0].payload.day}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {payload[0].payload.date}
          </p>
          <p className="text-lg font-bold text-green-600">
            Rs. {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Rising':
        return 'bg-green-100 text-green-700';
      case 'Declining':
        return 'bg-red-100 text-red-700';
      case 'Stable':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (status: string) => {
    switch (status) {
      case 'Rising':
        return <TrendingUp className="w-4 h-4" />;
      case 'Declining':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/crops')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{crop.name} Price Trend</h1>
            <p className="text-sm text-gray-500 mt-1">7-Day Price History</p>
          </div>
        </div>
        <Badge className={getStatusColor(crop.marketStatus)}>
          {getTrendIcon(crop.marketStatus)}
          <span className="ml-1">{crop.marketStatus}</span>
        </Badge>
      </div>

      {/* Current Price Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" />
              <p className="text-sm opacity-90">Current Price</p>
            </div>
            <p className="text-3xl font-bold">Rs. {crop.currentPrice}</p>
            <p className="text-xs opacity-75 mt-1">per {crop.unit}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500 mb-2">Average Price</p>
            <p className="text-2xl font-bold text-gray-900">Rs. {avgPrice.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">7-day average</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500 mb-2">Price Range</p>
            <p className="text-2xl font-bold text-gray-900">
              {minPrice} - {maxPrice}
            </p>
            <p className="text-xs text-gray-500 mt-1">Min - Max</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="pt-6">
            <p className="text-xs text-gray-500 mb-2">7-Day Change</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange}
              </p>
              {priceChange >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {priceChange >= 0 ? '+' : ''}{priceChangePercent}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Price Trend Chart */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            7-Day Price Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={crop.priceHistory}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                label={{ value: 'Price (Rs)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6b7280' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#10b981" 
                strokeWidth={3}
                fill="url(#colorPrice)"
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Price History Table */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Detailed Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Day
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price (Rs)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {crop.priceHistory.map((item, index) => {
                  const prevPrice = index > 0 ? crop.priceHistory[index - 1].price : item.price;
                  const change = item.price - prevPrice;
                  const changePercent = prevPrice > 0 ? ((change / prevPrice) * 100).toFixed(2) : '0.00';

                  return (
                    <tr key={item.date} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {item.day}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        Rs. {item.price}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {index === 0 ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <div className="flex items-center gap-1">
                            {change >= 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {change >= 0 ? '+' : ''}{change} ({change >= 0 ? '+' : ''}{changePercent}%)
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropTrend;

