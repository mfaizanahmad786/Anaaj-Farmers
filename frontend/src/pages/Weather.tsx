import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CloudRain, Sun, Wind, Droplets, Cloud, ThermometerSun, MapPin, Calendar, Search, CloudLightning } from 'lucide-react';

interface DayForecast {
  id: number;
  day: string;
  date: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: 'sunny' | 'rainy' | 'cloudy' | 'hot' | 'partly-cloudy' | 'storm';
  icon: string;
}

const Weather = () => {
  // Current city selection
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Extended list of Pakistani cities
  const allCities = [
    'Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad',
    'Rawalpindi', 'Gujranwala', 'Sialkot', 'Bahawalpur', 'Sargodha', 'Sukkur',
    'Larkana', 'Hyderabad', 'Mardan', 'Mingora', 'Abbottabad', 'Dera Ismail Khan',
    'Sahiwal', 'Okara', 'Mirpur Khas', 'Nawabshah', 'Dera Ghazi Khan', 'Jhang',
    'Sheikhupura', 'Gujrat', 'Kasur', 'Rahim Yar Khan', 'Gilgit', 'Muzaffarabad'
  ];

  // Filter cities based on search query
  const filteredCities = searchQuery
    ? allCities.filter(city => 
        city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allCities.slice(0, 7); // Show first 7 cities when no search

  const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchQuery(''); // Clear search after selection
  };

  // Mock 7-day forecast data
  const forecast: DayForecast[] = [
    {
      id: 1,
      day: 'Today',
      date: 'Nov 4',
      temperature: 32,
      tempMin: 24,
      tempMax: 35,
      humidity: 65,
      rainfall: 5,
      windSpeed: 12,
      condition: 'sunny',
      icon: 'sun',
    },
    {
      id: 2,
      day: 'Tomorrow',
      date: 'Nov 5',
      temperature: 30,
      tempMin: 23,
      tempMax: 33,
      humidity: 70,
      rainfall: 15,
      windSpeed: 15,
      condition: 'partly-cloudy',
      icon: 'cloud',
    },
    {
      id: 3,
      day: 'Wednesday',
      date: 'Nov 6',
      temperature: 28,
      tempMin: 22,
      tempMax: 31,
      humidity: 75,
      rainfall: 40,
      windSpeed: 18,
      condition: 'rainy',
      icon: 'rain',
    },
    {
      id: 4,
      day: 'Thursday',
      date: 'Nov 7',
      temperature: 27,
      tempMin: 21,
      tempMax: 30,
      humidity: 72,
      rainfall: 25,
      windSpeed: 16,
      condition: 'cloudy',
      icon: 'cloud',
    },
    {
      id: 5,
      day: 'Friday',
      date: 'Nov 8',
      temperature: 31,
      tempMin: 23,
      tempMax: 34,
      humidity: 60,
      rainfall: 10,
      windSpeed: 10,
      condition: 'partly-cloudy',
      icon: 'cloud',
    },
    {
      id: 6,
      day: 'Saturday',
      date: 'Nov 9',
      temperature: 33,
      tempMin: 25,
      tempMax: 36,
      humidity: 55,
      rainfall: 2,
      windSpeed: 8,
      condition: 'sunny',
      icon: 'sun',
    },
    {
      id: 7,
      day: 'Sunday',
      date: 'Nov 10',
      temperature: 35,
      tempMin: 26,
      tempMax: 38,
      humidity: 50,
      rainfall: 0,
      windSpeed: 7,
      condition: 'hot',
      icon: 'sun',
    },
  ];

  const getWeatherIcon = (condition: string, size: string = 'w-12 h-12') => {
    switch (condition) {
      case 'sunny':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'rainy':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'cloudy':
        return <Cloud className={`${size} text-gray-500`} />;
      case 'hot':
        return <ThermometerSun className={`${size} text-orange-500`} />;
      case 'partly-cloudy':
        return <Cloud className={`${size} text-gray-400`} />;
      case 'storm':
        return <CloudLightning className={`${size} text-gray-200`} />;
      default:
        return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return 'from-yellow-500 to-orange-500';
      case 'rainy':
        return 'from-blue-500 to-blue-600';
      case 'cloudy':
        return 'from-gray-500 to-gray-600';
      case 'hot':
        return 'from-orange-500 to-red-500';
      case 'partly-cloudy':
        return 'from-blue-400 to-gray-500';
      case 'storm':
        return 'from-gray-700 to-gray-900';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  // Today's weather (first item in forecast)
  const today = forecast[0];

  return (
    <div className="space-y-6">
      {/* Header with City Selector */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Weather Forecast</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={handleCitySearch}
            className="pl-10 pr-4 py-2 w-full md:w-96"
          />
          
          {/* Search Results Dropdown */}
          {searchQuery && filteredCities.length > 0 && (
            <div className="absolute z-10 w-full md:w-96 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{city}</span>
                </button>
              ))}
            </div>
          )}
          
          {/* No Results */}
          {searchQuery && filteredCities.length === 0 && (
            <div className="absolute z-10 w-full md:w-96 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500 text-sm">
              No cities found matching "{searchQuery}"
            </div>
          )}
        </div>
        
        {/* Quick City Selector Buttons */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Quick select:</p>
          <div className="flex items-center gap-2 flex-wrap">
            {filteredCities.slice(0, 7).map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? 'default' : 'outline'}
                className={selectedCity === city ? 'bg-gray-900' : ''}
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Weather Card */}
      <Card className={`bg-gradient-to-br ${getConditionColor(today.condition)} border-none shadow-lg text-white`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <CardTitle className="text-2xl">{selectedCity}</CardTitle>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">{today.day}</p>
              <p className="text-xs opacity-75">{today.date}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-bold">{today.temperature}°</span>
                <span className="text-2xl mb-2 opacity-90">C</span>
              </div>
              <p className="text-lg capitalize mt-2 opacity-90">{today.condition}</p>
              <p className="text-sm opacity-75 mt-1">
                H: {today.tempMax}° L: {today.tempMin}°
              </p>
            </div>
            {getWeatherIcon(today.condition, 'w-24 h-24')}
          </div>

          {/* Current Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-75">Humidity</p>
                <p className="text-lg font-semibold">{today.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-75">Rainfall</p>
                <p className="text-lg font-semibold">{today.rainfall}mm</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-75">Wind Speed</p>
                <p className="text-lg font-semibold">{today.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThermometerSun className="w-5 h-5 opacity-80" />
              <div>
                <p className="text-xs opacity-75">Feels Like</p>
                <p className="text-lg font-semibold">{today.temperature + 2}°C</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold">7-Day Forecast</h2>
        </div>

        {/* Desktop View - Grid */}
        <div className="hidden md:grid md:grid-cols-7 gap-4">
          {forecast.map((day) => (
            <Card key={day.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <p className="font-semibold text-sm">{day.day}</p>
                  <p className="text-xs text-gray-500">{day.date}</p>
                  <div className="flex justify-center">
                    {getWeatherIcon(day.condition, 'w-10 h-10')}
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{day.temperature}°</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {day.tempMax}° / {day.tempMin}°
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                      <Droplets className="w-3 h-3" />
                      <span>{day.humidity}%</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                      <CloudRain className="w-3 h-3" />
                      <span>{day.rainfall}mm</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                      <Wind className="w-3 h-3" />
                      <span>{day.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile View - List */}
        <div className="md:hidden space-y-3">
          {forecast.map((day) => (
            <Card key={day.id} className="border-none shadow-sm">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(day.condition, 'w-12 h-12')}
                    <div>
                      <p className="font-semibold">{day.day}</p>
                      <p className="text-xs text-gray-500">{day.date}</p>
                      <p className="text-xs text-gray-600 capitalize mt-1">{day.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{day.temperature}°</p>
                    <p className="text-xs text-gray-500">
                      {day.tempMax}° / {day.tempMin}°
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Droplets className="w-4 h-4" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <CloudRain className="w-4 h-4" />
                    <span>{day.rainfall}mm</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Wind className="w-4 h-4" />
                    <span>{day.windSpeed} km/h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
