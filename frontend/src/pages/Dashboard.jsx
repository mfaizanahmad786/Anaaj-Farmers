import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowUpCircle, ArrowDownCircle, Activity, CloudSun } from 'lucide-react';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import { Link } from 'react-router-dom';
import { getFollowedCrops } from '@/lib/followedCrops';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Dashboard = () => {
  const [selectedCrop, setSelectedCrop] = useState('Potato');
  const [followedCrops, setFollowedCrops] = useState([]);
  
  // Load followed crops from localStorage
  useEffect(() => {
    const loadFollowedCrops = () => {
      const followed = getFollowedCrops();
      setFollowedCrops(followed);
      // If user has followed crops, select the first one
      if (followed.length > 0 && !cropDataMap[selectedCrop]) {
        setSelectedCrop(followed[0].name);
      }
    };
    
    loadFollowedCrops();
    
    // Listen for changes in followed crops
    const handleFollowChange = () => {
      loadFollowedCrops();
    };
    
    window.addEventListener('followedCropsChanged', handleFollowChange);
    return () => window.removeEventListener('followedCropsChanged', handleFollowChange);
  }, []);

  // Stats cards data
  const stats = [
    {
      title: 'Highest Price Jump',
      value: '7,265',
      change: '+11.01%',
      isPositive: true,
      bgColor: 'bg-purple-50',
      icon: ArrowUpCircle,
      iconColor: 'text-purple-600',
    },
    {
      title: 'Lowest Price Jump',
      value: '3,671',
      change: '-0.03%',
      isPositive: false,
      bgColor: 'bg-blue-50',
      icon: ArrowDownCircle,
      iconColor: 'text-blue-600',
    },
    {
      title: 'Market Volatility',
      value: '156',
      change: '+15.03%',
      isPositive: true,
      bgColor: 'bg-cyan-50',
      icon: Activity,
      iconColor: 'text-cyan-600',
    },
    {
      title: 'Weather',
      value: '28°C',
      change: 'Clear Sky',
      isPositive: true,
      bgColor: 'bg-amber-50',
      icon: CloudSun,
      iconColor: 'text-amber-600',
    },
  ];

  // Create separate data for each crop
  const cropDataMap = {
    Tomato: [
      { month: 'Jan', thisYear: 18000, lastYear: 16000 },
      { month: 'Feb', thisYear: 22000, lastYear: 18000 },
      { month: 'Mar', thisYear: 19000, lastYear: 20000 },
      { month: 'Apr', thisYear: 28000, lastYear: 15000 },
      { month: 'May', thisYear: 25000, lastYear: 19000 },
      { month: 'Jun', thisYear: 32000, lastYear: 23000 },
      { month: 'Jul', thisYear: 30000, lastYear: 28000 },
    ],
    Potato: [
      { month: 'Jan', thisYear: 15000, lastYear: 18000 },
      { month: 'Feb', thisYear: 18000, lastYear: 12000 },
      { month: 'Mar', thisYear: 12000, lastYear: 14000 },
      { month: 'Apr', thisYear: 25000, lastYear: 8000 },
      { month: 'May', thisYear: 22000, lastYear: 12000 },
      { month: 'Jun', thisYear: 30000, lastYear: 20000 },
      { month: 'Jul', thisYear: 28000, lastYear: 25000 },
    ],
    Wheat: [
      { month: 'Jan', thisYear: 12000, lastYear: 13000 },
      { month: 'Feb', thisYear: 14000, lastYear: 11000 },
      { month: 'Mar', thisYear: 16000, lastYear: 15000 },
      { month: 'Apr', thisYear: 18000, lastYear: 12000 },
      { month: 'May', thisYear: 20000, lastYear: 17000 },
      { month: 'Jun', thisYear: 22000, lastYear: 19000 },
      { month: 'Jul', thisYear: 21000, lastYear: 20000 },
    ],
    Rice: [
      { month: 'Jan', thisYear: 20000, lastYear: 19000 },
      { month: 'Feb', thisYear: 21000, lastYear: 20000 },
      { month: 'Mar', thisYear: 23000, lastYear: 21000 },
      { month: 'Apr', thisYear: 24000, lastYear: 22000 },
      { month: 'May', thisYear: 26000, lastYear: 24000 },
      { month: 'Jun', thisYear: 28000, lastYear: 26000 },
      { month: 'Jul', thisYear: 27000, lastYear: 27000 },
    ],
  };

  // Get data for selected crop
  const followedCropsData = cropDataMap[selectedCrop] || cropDataMap.Potato;
  
  // Determine which crops to show in the selector
  const cropsToShow = followedCrops.length > 0 
    ? followedCrops.map(c => c.name).filter(name => cropDataMap[name])
    : Object.keys(cropDataMap);
    
  const isShowingFollowed = followedCrops.length > 0;

  // Crop Prices bar chart data
  const cropPricesData = [
    { crop: 'Potato', price: 18000 },
    { crop: 'Tomato', price: 30000 },
    { crop: 'Rice', price: 23000 },
    { crop: 'Avocado', price: 32000 },
    { crop: 'Grape', price: 15000 },
    { crop: 'Peach', price: 28000 },
  ];

  // Crops Supply donut chart data
  const cropsSupplyData = [
    { name: 'Cash Crops', value: 52.1, color: '#1f2937' },
    { name: 'Vegetables', value: 22.8, color: '#93c5fd' },
    { name: 'Fruits', value: 13.9, color: '#86efac' },
    { name: 'Pulses & Legumes', value: 11.2, color: '#cbd5e1' },
  ];

  // Today's Hotlist data
  const hotlistData = [
    { crop: 'Potato', value: 60 },
    { crop: 'Tomato', value: 80 },
    { crop: 'Wheat', value: 65 },
    { crop: 'Tobacco', value: 90 },
    { crop: 'Rice', value: 70 },
    { crop: 'Peach', value: 75 },
  ];

  const barColors = ['#93c5fd', '#86efac', '#1f2937', '#60a5fa', '#a78bfa', '#86efac'];

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 mr-80">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Overview</h1>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className={stat.bgColor}>
                <CardHeader className="pb-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-3xl font-bold">{stat.value}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.isPositive ? (
                          <TrendingUp className="w-3 h-3 text-gray-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-gray-600" />
                        )}
                        <span className="text-xs text-gray-600">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center ${stat.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Followed Crops Chart */}
          <Card className="col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-semibold">
                    {isShowingFollowed ? 'Followed Crops' : 'Market Crops'}
                  </CardTitle>
                  {!isShowingFollowed && (
                    <span className="text-xs text-gray-500">
                      (<Link to="/crops" className="underline hover:text-gray-700">Follow crops</Link> to customize)
                    </span>
                  )}
                </div>
                <div className="flex gap-4 text-xs overflow-x-auto max-w-md">
                  {cropsToShow.length > 0 ? (
                    cropsToShow.map((cropName) => (
                      <button
                        key={cropName}
                        onClick={() => setSelectedCrop(cropName)}
                        className={`flex items-center gap-1 pb-1 transition-all whitespace-nowrap ${
                          selectedCrop === cropName
                            ? 'border-b-2 border-black font-medium'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <span>{cropName}</span>
                      </button>
                    ))
                  ) : (
                    <span className="text-gray-500">No crops available</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black"></div>
                  <span>This year</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full border-2 border-gray-300"></div>
                  <span>Last year</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={followedCropsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="thisYear" stroke="#000" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="lastYear" stroke="#d1d5db" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Today's Hotlist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Today's Hotlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {hotlistData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-16">{item.crop}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-900 rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Crop Prices Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Crop Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cropPricesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="crop" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                  <Tooltip />
                  <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                    {cropPricesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Crops Supply Donut Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Crops Supply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <ResponsiveContainer width="60%" height={220}>
                  <PieChart>
                    <Pie
                      data={cropsSupplyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {cropsSupplyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3 flex-1">
                  {cropsSupplyData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-xs font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notifications Panel */}
      <NotificationsPanel />
    </div>
  );
};

export default Dashboard;

