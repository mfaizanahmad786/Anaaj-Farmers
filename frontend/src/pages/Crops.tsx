import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, StarOff, TrendingUp, TrendingDown, LineChart } from 'lucide-react';
import { getFollowedCrops, toggleFollowCrop, type FollowedCrop } from '@/lib/followedCrops';

interface Crop {
  id: number;
  name: string;
  category: string;
  currentPrice: number;
  priceChange: number;
  marketStatus: 'High' | 'Low' | 'Stable';
  lastUpdated: string;
  isFollowing: boolean;
}

const Crops = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: 1,
      name: 'Wheat',
      category: 'Grains',
      currentPrice: 2450,
      priceChange: 5.2,
      marketStatus: 'High',
      lastUpdated: '2 hours ago',
      isFollowing: false,
    },
    {
      id: 2,
      name: 'Rice',
      category: 'Grains',
      currentPrice: 3200,
      priceChange: -2.1,
      marketStatus: 'Low',
      lastUpdated: '3 hours ago',
      isFollowing: false,
    },
    {
      id: 3,
      name: 'Tomato',
      category: 'Vegetables',
      currentPrice: 850,
      priceChange: 12.5,
      marketStatus: 'High',
      lastUpdated: '1 hour ago',
      isFollowing: true,
    },
    {
      id: 4,
      name: 'Potato',
      category: 'Vegetables',
      currentPrice: 1200,
      priceChange: 3.8,
      marketStatus: 'Stable',
      lastUpdated: '4 hours ago',
      isFollowing: true,
    },
    {
      id: 5,
      name: 'Corn',
      category: 'Grains',
      currentPrice: 1890,
      priceChange: -1.5,
      marketStatus: 'Low',
      lastUpdated: '5 hours ago',
      isFollowing: false,
    },
    {
      id: 6,
      name: 'Onion',
      category: 'Vegetables',
      currentPrice: 950,
      priceChange: 8.3,
      marketStatus: 'High',
      lastUpdated: '2 hours ago',
      isFollowing: false,
    },
    {
      id: 7,
      name: 'Cotton',
      category: 'Cash Crops',
      currentPrice: 5600,
      priceChange: 2.7,
      marketStatus: 'Stable',
      lastUpdated: '6 hours ago',
      isFollowing: false,
    },
    {
      id: 8,
      name: 'Sugarcane',
      category: 'Cash Crops',
      currentPrice: 3800,
      priceChange: -3.2,
      marketStatus: 'Low',
      lastUpdated: '3 hours ago',
      isFollowing: false,
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'following'>('all');

  // Load followed status from localStorage on mount
  useEffect(() => {
    const followed = getFollowedCrops();
    const followedIds = followed.map(c => c.id);
    setCrops(crops => crops.map(crop => ({
      ...crop,
      isFollowing: followedIds.includes(crop.id)
    })));
  }, []);

  const toggleFollow = (id: number) => {
    const crop = crops.find(c => c.id === id);
    if (crop) {
      const followedCrop: FollowedCrop = {
        id: crop.id,
        name: crop.name,
        category: crop.category,
        currentPrice: crop.currentPrice
      };
      const nowFollowing = toggleFollowCrop(followedCrop);
      setCrops(crops.map(c => 
        c.id === id ? { ...c, isFollowing: nowFollowing } : c
      ));
    }
  };

  const filteredCrops = filter === 'following' 
    ? crops.filter(crop => crop.isFollowing)
    : crops;

  const followingCount = crops.filter(c => c.isFollowing).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">All Crops</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse and follow crops to track their prices
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {followingCount} Following
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter === 'all'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          All Crops ({crops.length})
        </button>
        <button
          onClick={() => setFilter('following')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            filter === 'following'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Following ({followingCount})
        </button>
      </div>

      {/* Crops Table */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCrops.map((crop) => (
                  <tr key={crop.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {crop.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{crop.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{crop.currentPrice.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {crop.priceChange > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            crop.priceChange > 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {crop.priceChange > 0 ? '+' : ''}{crop.priceChange}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{crop.lastUpdated}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/crops/${crop.id}/trend`)}
                          className="gap-2"
                        >
                          <LineChart className="w-4 h-4" />
                          View Trend
                        </Button>
                        <Button
                          variant={crop.isFollowing ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleFollow(crop.id)}
                          className="gap-2"
                        >
                          {crop.isFollowing ? (
                            <>
                              <Star className="w-4 h-4 fill-current" />
                              Following
                            </>
                          ) : (
                            <>
                              <StarOff className="w-4 h-4" />
                              Follow
                            </>
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Empty State for Following */}
      {filter === 'following' && filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No crops followed yet
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Start following crops to see them here and track their prices
          </p>
          <Button onClick={() => setFilter('all')}>Browse All Crops</Button>
        </div>
      )}
    </div>
  );
};

export default Crops;

