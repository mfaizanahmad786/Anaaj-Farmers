# Farmer API Documentation

This document provides comprehensive documentation for all API endpoints accessible to farmers in the Smart Agriculture Market Tracker platform.

## 🔑 Authentication

All endpoints require authentication via Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

## 📊 Base URL

```
http://localhost:5000/api
```

---

## 📈 Market Data Endpoints

### 1. Get All Market Items

**Endpoint:** `GET /api/market/items`

**Description:** Retrieve all market items with filtering, search, and pagination.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page
- `category` (optional) - Filter by category: `vegetable` or `fruit`
- `region` (optional) - Filter by region
- `search` (optional) - Search items by name
- `isActive` (optional, default: `true`) - Filter by active status: `true`, `false`, or `all`
- `sortBy` (optional, default: `name`) - Sort field: `name`, `category`, `currentPrice`, `createdAt`, `updatedAt`
- `sortOrder` (optional, default: `asc`) - Sort order: `asc` or `desc`

**Example Request:**
```bash
GET /api/market/items?category=vegetable&page=1&limit=10&sortBy=currentPrice&sortOrder=desc
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "64f1e2b3c1234567890abcde",
        "name": "Tomato",
        "category": "vegetable",
        "unit": "kg",
        "currentPrice": 120,
        "region": "Lahore",
        "imageUrl": "https://example.com/tomato.jpg",
        "description": "Fresh red tomatoes",
        "isActive": true,
        "createdAt": "2024-01-15T10:00:00.000Z",
        "updatedAt": "2024-01-20T15:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  },
  "message": "Success"
}
```

---

### 2. Get Single Market Item

**Endpoint:** `GET /api/market/items/:id`

**Description:** Get detailed information about a specific market item including price history and statistics.

**Example Request:**
```bash
GET /api/market/items/64f1e2b3c1234567890abcde
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "item": {
      "_id": "64f1e2b3c1234567890abcde",
      "name": "Tomato",
      "category": "vegetable",
      "unit": "kg",
      "currentPrice": 120,
      "region": "Lahore",
      "imageUrl": "https://example.com/tomato.jpg",
      "isActive": true
    },
    "priceHistory": [
      {
        "_id": "64f1e2b3c1234567890abcdf",
        "price": 120,
        "date": "2024-01-20T00:00:00.000Z",
        "region": "Lahore",
        "notes": "Market update"
      }
    ],
    "statistics": {
      "averagePrice": 115.5,
      "minPrice": 100,
      "maxPrice": 130,
      "priceChange": 8.5,
      "daysAnalyzed": 7
    }
  }
}
```

---

### 3. Get Price History

**Endpoint:** `GET /api/market/items/:id/prices`

**Description:** Get price history for a specific item with trend analysis.

**Query Parameters:**
- `days` (optional, default: 30, max: 365) - Number of days to retrieve
- `region` (optional) - Filter by region

**Example Request:**
```bash
GET /api/market/items/64f1e2b3c1234567890abcde/prices?days=7
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "itemName": "Tomato",
    "priceHistory": [
      {
        "price": 120,
        "date": "2024-01-20T00:00:00.000Z",
        "region": "Lahore",
        "updatedBy": {
          "name": "Admin User",
          "email": "admin@example.com"
        }
      }
    ],
    "statistics": {
      "averagePrice": 115.5,
      "minPrice": 100,
      "maxPrice": 130,
      "trend": "increasing",
      "volatility": "medium"
    },
    "period": {
      "days": 7,
      "startDate": "2024-01-14T00:00:00.000Z",
      "endDate": "2024-01-20T00:00:00.000Z"
    }
  }
}
```

---

## 🌤️ Weather Endpoints

### 1. Get Weather for Multiple Cities

**Endpoint:** `GET /api/weather/cities`

**Description:** Get current weather data for multiple Pakistani cities.

**Query Parameters:**
- `cities` (optional) - Comma-separated list of cities (defaults to major Pakistani cities)

**Example Request:**
```bash
GET /api/weather/cities?cities=Lahore,Karachi,Islamabad
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "cities": [
      {
        "city": "Lahore",
        "temperature": 28,
        "feelsLike": 30,
        "humidity": 65,
        "condition": "Clear",
        "description": "clear sky",
        "icon": "01d",
        "windSpeed": 3.5,
        "pressure": 1013,
        "visibility": 10000,
        "cloudiness": 10,
        "lastUpdated": "2024-01-20T10:00:00.000Z"
      }
    ],
    "count": 3,
    "lastUpdated": "2024-01-20T10:00:00.000Z"
  }
}
```

---

### 2. Get Weather for Specific City

**Endpoint:** `GET /api/weather/cities/:cityName`

**Description:** Get detailed weather information for a specific city.

**Example Request:**
```bash
GET /api/weather/cities/Lahore
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "city": "Lahore",
    "temperature": 28,
    "feelsLike": 30,
    "humidity": 65,
    "condition": "Clear",
    "description": "clear sky",
    "icon": "01d",
    "windSpeed": 3.5,
    "pressure": 1013,
    "visibility": 10000,
    "cloudiness": 10,
    "lastUpdated": "2024-01-20T10:00:00.000Z"
  }
}
```

---

### 3. Get Available Cities

**Endpoint:** `GET /api/weather/available-cities`

**Description:** Get list of all available Pakistani cities for weather data.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "cities": [
      "Karachi",
      "Lahore",
      "Islamabad",
      "Rawalpindi",
      "Faisalabad",
      "Multan",
      "Peshawar",
      "Quetta",
      "Sialkot",
      "Gujranwala"
    ],
    "count": 10
  }
}
```

---

## 🤖 Smart Advice Endpoints (AI-Powered)

### 1. Get Daily Farming Advice

**Endpoint:** `GET /api/advice/daily`

**Description:** Get comprehensive AI-powered daily farming advice combining weather and market insights.

**Query Parameters:**
- `region` (optional) - Filter recommendations by region
- `city` (optional, default: `Lahore`) - City for weather-based advice

**Example Request:**
```bash
GET /api/advice/daily?city=Lahore&region=Punjab
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-01-20T10:00:00.000Z",
    "city": "Lahore",
    "region": "Punjab",
    "aiPowered": true,
    "weather": {
      "temperature": 28,
      "condition": "Clear",
      "advice": [
        {
          "category": "weather",
          "type": "optimal",
          "icon": "✅",
          "title": "Perfect Farming Conditions",
          "message": "Excellent weather for field work. Good day for planting and harvesting.",
          "priority": "low"
        }
      ]
    },
    "priceAnalysis": {
      "totalItemsAnalyzed": 25,
      "sellingOpportunities": [
        {
          "name": "Tomato",
          "currentPrice": 120,
          "trend": {
            "changePercentage": 15.5,
            "direction": "up"
          }
        }
      ],
      "holdingOpportunities": [],
      "advice": [
        {
          "category": "price",
          "type": "sell",
          "icon": "📈",
          "title": "Consider Selling Tomato",
          "message": "Price has increased by 15.5% over 7 days. Good time to sell.",
          "priority": "high"
        }
      ]
    },
    "recommendations": [],
    "summary": "3 important recommendations for today",
    "aiInsights": {
      "summary": "Favorable weather and strong tomato prices today",
      "topPriorities": [
        "Sell tomatoes at current high prices",
        "Plant winter vegetables",
        "Monitor potato prices"
      ],
      "weatherInsights": {
        "impact": "Clear weather ideal for harvesting",
        "recommendations": [
          "Continue regular watering schedule",
          "Apply fertilizer to winter crops",
          "Monitor for pests in dry conditions"
        ]
      },
      "marketInsights": {
        "hotItems": ["Tomato", "Onion"],
        "holdItems": ["Potato"],
        "opportunities": "Strong demand for vegetables in urban markets"
      },
      "farmingTips": [
        "Prepare land for spring planting",
        "Check irrigation systems",
        "Store harvested crops properly"
      ]
    }
  }
}
```

---

### 2. Get Item-Specific Advice

**Endpoint:** `GET /api/advice/item/:itemId`

**Description:** Get AI-powered advice specific to a market item based on price trends.

**Example Request:**
```bash
GET /api/advice/item/64f1e2b3c1234567890abcde
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "item": {
      "id": "64f1e2b3c1234567890abcde",
      "name": "Tomato",
      "category": "vegetable",
      "currentPrice": 120,
      "unit": "kg"
    },
    "priceTrend": {
      "trend": "increasing",
      "direction": "up",
      "changePercentage": 15.5,
      "oldestPrice": 100,
      "latestPrice": 120,
      "daysAnalyzed": 7,
      "isConsistentlyIncreasing": true
    },
    "volatility": {
      "volatility": "medium",
      "standardDeviation": 8.5,
      "coefficient": 7.5,
      "mean": 113.5
    },
    "advice": [
      {
        "category": "price",
        "type": "sell",
        "icon": "📈",
        "title": "Consider Selling Tomato",
        "message": "Strong upward trend with 15.5% increase. Recommend selling within 2-3 days.",
        "priority": "high",
        "itemId": "64f1e2b3c1234567890abcde",
        "itemName": "Tomato"
      }
    ],
    "aiPowered": true,
    "lastUpdated": "2024-01-20T10:00:00.000Z"
  }
}
```

---

### 3. Get Seasonal Planting Advice

**Endpoint:** `GET /api/advice/seasonal`

**Description:** Get seasonal planting recommendations based on the current month.

**Query Parameters:**
- `month` (optional, default: current month) - Month number (1-12)

**Example Request:**
```bash
GET /api/advice/seasonal?month=11
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "season": "winter",
    "month": 11,
    "months": [11, 12, 1, 2],
    "crops": [
      "Wheat",
      "Potato",
      "Tomato",
      "Peas",
      "Carrot",
      "Cauliflower"
    ],
    "advice": "Winter season is ideal for growing wheat and winter vegetables. Protect crops from frost."
  }
}
```

---

### 4. Get Price Opportunities

**Endpoint:** `GET /api/advice/price-opportunities`

**Description:** Get current selling and holding opportunities based on market analysis.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "sellingOpportunities": [
      {
        "name": "Tomato",
        "currentPrice": 120,
        "trend": {
          "changePercentage": 15.5,
          "isConsistentlyIncreasing": true
        }
      }
    ],
    "holdingOpportunities": [
      {
        "name": "Potato",
        "currentPrice": 50,
        "trend": {
          "changePercentage": -12.3,
          "direction": "down"
        }
      }
    ],
    "significantChanges": {
      "increasingItems": [],
      "decreasingItems": [],
      "totalAnalyzed": 25
    },
    "generatedAt": "2024-01-20T10:00:00.000Z"
  }
}
```

---

### 5. Get Weather-Based Tips

**Endpoint:** `GET /api/advice/weather-tips`

**Description:** Get AI-powered weather-based farming tips for a specific city.

**Query Parameters:**
- `city` (optional, default: `Lahore`) - City name

**Example Request:**
```bash
GET /api/advice/weather-tips?city=Lahore
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "city": "Lahore",
    "weather": {
      "temperature": 28,
      "condition": "Clear",
      "humidity": 65
    },
    "tips": [
      {
        "category": "weather",
        "type": "optimal",
        "icon": "✅",
        "title": "Perfect Farming Day",
        "message": "Ideal conditions for all farming activities. Focus on planting and field maintenance.",
        "priority": "low"
      },
      {
        "category": "weather",
        "type": "watering",
        "icon": "💧",
        "title": "Maintain Regular Watering",
        "message": "Clear skies and moderate temperature. Continue regular irrigation schedule.",
        "priority": "medium"
      }
    ],
    "aiPowered": true,
    "generatedAt": "2024-01-20T10:00:00.000Z"
  }
}
```

---

## 💬 Community Forum Endpoints

### 1. Get All Posts

**Endpoint:** `GET /api/forum/posts`

**Description:** Get all forum posts with filtering and pagination.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Posts per page
- `category` (optional) - Filter by category
- `search` (optional) - Search posts by title/content
- `sortBy` (optional, default: `createdAt`) - Sort field
- `sortOrder` (optional, default: `desc`) - Sort order
- `author` (optional) - Filter by author ID
- `tag` (optional) - Filter by tag

**Available Categories:**
- `general`, `crops`, `livestock`, `market`, `weather`, `tips`, `questions`, `success_stories`, `equipment`, `other`

**Example Request:**
```bash
GET /api/forum/posts?category=crops&page=1&limit=10
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "64f1e2b3c1234567890abc01",
        "title": "Best practices for tomato cultivation",
        "content": "I want to share my experience...",
        "author": {
          "_id": "64f1e2b3c1234567890abc00",
          "name": "Farmer Ali",
          "email": "ali@example.com",
          "role": "farmer",
          "region": "Punjab"
        },
        "category": "crops",
        "tags": ["tomato", "tips"],
        "likesCount": 15,
        "commentsCount": 8,
        "viewsCount": 120,
        "isPinned": false,
        "isLocked": false,
        "images": [],
        "createdAt": "2024-01-20T10:00:00.000Z",
        "updatedAt": "2024-01-20T10:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 50,
      "postsPerPage": 10
    }
  }
}
```

---

### 2. Get Single Post

**Endpoint:** `GET /api/forum/posts/:id`

**Description:** Get detailed information about a single post including comments.

**Query Parameters:**
- `includeComments` (optional, default: `true`) - Include comments in response

**Example Request:**
```bash
GET /api/forum/posts/64f1e2b3c1234567890abc01
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1e2b3c1234567890abc01",
    "title": "Best practices for tomato cultivation",
    "content": "I want to share my experience...",
    "author": {
      "name": "Farmer Ali",
      "email": "ali@example.com",
      "role": "farmer"
    },
    "category": "crops",
    "likesCount": 15,
    "commentsCount": 8,
    "viewsCount": 121,
    "isLikedByCurrentUser": false,
    "comments": [
      {
        "_id": "64f1e2b3c1234567890abc02",
        "content": "Great post! Very helpful.",
        "author": {
          "name": "Farmer Hassan",
          "email": "hassan@example.com"
        },
        "likesCount": 3,
        "replies": [],
        "repliesCount": 0,
        "createdAt": "2024-01-20T11:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-20T10:00:00.000Z"
  }
}
```

---

### 3. Create Post

**Endpoint:** `POST /api/forum/posts`

**Description:** Create a new forum post.

**Request Body:**
```json
{
  "title": "Best practices for tomato cultivation",
  "content": "I want to share my experience with growing tomatoes in Punjab region...",
  "category": "crops",
  "tags": ["tomato", "tips", "punjab"],
  "images": ["https://example.com/image1.jpg"]
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1e2b3c1234567890abc01",
    "title": "Best practices for tomato cultivation",
    "content": "I want to share my experience...",
    "author": {
      "name": "Farmer Ali",
      "email": "ali@example.com"
    },
    "category": "crops",
    "tags": ["tomato", "tips", "punjab"],
    "likesCount": 0,
    "commentsCount": 0,
    "viewsCount": 0,
    "createdAt": "2024-01-20T10:00:00.000Z"
  },
  "message": "Post created successfully"
}
```

---

### 4. Update Post

**Endpoint:** `PUT /api/forum/posts/:id`

**Description:** Update your own post (author only).

**Request Body:** (all fields optional)
```json
{
  "title": "Updated title",
  "content": "Updated content",
  "category": "tips",
  "tags": ["tomato", "best-practices"],
  "images": []
}
```

---

### 5. Delete Post

**Endpoint:** `DELETE /api/forum/posts/:id`

**Description:** Delete your own post (soft delete by default).

**Query Parameters:**
- `permanent` (optional, default: `false`) - Permanent delete (admin only)

---

### 6. Like/Unlike Post

**Endpoint:** `POST /api/forum/posts/:id/like`

**Description:** Toggle like on a post.

**Example Response:**
```json
{
  "success": true,
  "data": {
    "postId": "64f1e2b3c1234567890abc01",
    "liked": true,
    "likesCount": 16
  },
  "message": "Post liked"
}
```

---

### 7. Add Comment

**Endpoint:** `POST /api/forum/posts/:postId/comments`

**Description:** Add a comment to a post or reply to another comment.

**Request Body:**
```json
{
  "content": "Great post! Very helpful information.",
  "parentCommentId": null
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64f1e2b3c1234567890abc02",
    "postId": "64f1e2b3c1234567890abc01",
    "content": "Great post! Very helpful information.",
    "author": {
      "name": "Farmer Hassan",
      "email": "hassan@example.com"
    },
    "likesCount": 0,
    "createdAt": "2024-01-20T11:00:00.000Z"
  },
  "message": "Comment added successfully"
}
```

---

### 8. Update Comment

**Endpoint:** `PUT /api/forum/comments/:id`

**Description:** Update your own comment.

**Request Body:**
```json
{
  "content": "Updated comment text"
}
```

---

### 9. Delete Comment

**Endpoint:** `DELETE /api/forum/comments/:id`

**Description:** Delete your own comment.

**Query Parameters:**
- `permanent` (optional, default: `false`) - Permanent delete (admin only)

---

### 10. Like/Unlike Comment

**Endpoint:** `POST /api/forum/comments/:id/like`

**Description:** Toggle like on a comment.

---

### 11. Get Popular Posts

**Endpoint:** `GET /api/forum/popular`

**Description:** Get popular posts based on likes and comments.

**Query Parameters:**
- `limit` (optional, default: 10) - Number of posts
- `days` (optional, default: 7) - Time period

---

### 12. Get Trending Posts

**Endpoint:** `GET /api/forum/trending`

**Description:** Get trending posts based on views and engagement.

**Query Parameters:**
- `limit` (optional, default: 10) - Number of posts

---

### 13. Get My Posts

**Endpoint:** `GET /api/forum/my-posts`

**Description:** Get all posts created by the authenticated user.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Posts per page

---

## 🔥 AI Features

### AI-Powered Advice

The Smart Advice endpoints use **Google Gemini 2.0 Flash** model to generate:

1. **Contextual Weather Advice**: Real-time farming recommendations based on current weather conditions
2. **Price-Based Strategies**: Intelligent selling/holding recommendations based on market trends
3. **Comprehensive Daily Briefings**: Combined weather and market insights with actionable priorities
4. **Item-Specific Guidance**: Detailed advice for individual crops/products

### Fallback System

If the AI service is unavailable, the system automatically falls back to rule-based logic to ensure continuous service availability.

---

## 📋 Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  },
  "message": "Error occurred"
}
```

### HTTP Status Codes
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🚀 Getting Started

1. **Register/Login** using Firebase Authentication
2. **Get your Firebase ID token**
3. **Include token in Authorization header** for all API requests
4. **Start exploring the farmer-friendly endpoints!**

---

## 💡 Tips for Farmers

1. **Check Daily Advice** every morning for personalized recommendations
2. **Monitor Price Trends** to identify selling opportunities
3. **Participate in Forum** to learn from other farmers
4. **Use Weather Data** to plan your farming activities
5. **Track Item-Specific Advice** for your main crops

---

## 📞 Support

For technical support or questions, please contact the admin team.

---

**Note**: All endpoints require valid authentication. Make sure to include your Firebase ID token in all requests.

