# Anaaj Farmers App - Design System Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Icons](#icons)
7. [Charts & Data Visualization](#charts--data-visualization)
8. [Shadows & Elevation](#shadows--elevation)
9. [Border Radius](#border-radius)
10. [Responsive Breakpoints](#responsive-breakpoints)
11. [Implementation Guide](#implementation-guide)

---

## Overview

This design system is built using:
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS v3.4+
- **UI Library**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts

---

## Color Palette

### Primary Colors

#### Background & Surface
```css
--background: #FFFFFF (hsl(0 0% 100%))
--card-background: #FFFFFF (hsl(0 0% 100%))
--page-background: #F3F4F6 (gray-100)
```

#### Text Colors
```css
--foreground: #020617 (hsl(222.2 84% 4.9%))
--text-primary: #111827 (gray-900)
--text-secondary: #6B7280 (gray-500)
--text-muted: #9CA3AF (gray-400)
```

#### Borders & Dividers
```css
--border: #E5E7EB (hsl(214.3 31.8% 91.4%))
--input-border: #E5E7EB (gray-200)
```

### Accent Colors

#### Feature Gradients (Dashboard Cards)
```css
/* Purple Gradient */
background: linear-gradient(to bottom right, #a855f7, #9333ea)
from-purple-500 to-purple-600

/* Blue Gradient */
background: linear-gradient(to bottom right, #3b82f6, #2563eb)
from-blue-500 to-blue-600

/* Cyan Gradient */
background: linear-gradient(to bottom right, #06b6d4, #0891b2)
from-cyan-500 to-cyan-600

/* Green Gradient */
background: linear-gradient(to bottom right, #10b981, #059669)
from-green-500 to-green-600

/* Orange/Yellow Gradient */
background: linear-gradient(to bottom right, #f59e0b, #d97706)
from-amber-500 to-amber-600

/* Red Gradient */
background: linear-gradient(to bottom right, #ef4444, #dc2626)
from-red-500 to-red-600
```

#### Status Colors
```css
/* Success */
--success: #10B981 (green-500)
--success-light: #D1FAE5 (green-100)

/* Warning */
--warning: #F59E0B (amber-500)
--warning-light: #FEF3C7 (amber-100)

/* Error/Destructive */
--destructive: #EF4444 (red-500)
--destructive-light: #FEE2E2 (red-100)

/* Info */
--info: #3B82F6 (blue-500)
--info-light: #DBEAFE (blue-100)
```

#### Chart Colors
```css
/* Primary Chart Color (Purple) */
--chart-primary: #A855F7 (purple-500)

/* Secondary Chart Color (Blue) */
--chart-secondary: #60A5FA (blue-400)

/* Tertiary Chart Colors */
--chart-green: #10B981 (green-500)
--chart-orange: #F59E0B (amber-500)
--chart-cyan: #06B6D4 (cyan-500)
--chart-pink: #EC4899 (pink-500)

/* Chart Grid/Axis */
--chart-grid: #E5E7EB (gray-200)
--chart-axis: #9CA3AF (gray-400)
```

### Weather Condition Colors
```css
/* Rainy Weather */
--weather-rain: #3B82F6 (blue-500)

/* Hot Weather */
--weather-hot: #FFA500 (orange-500)

/* Normal Weather */
--weather-normal: #10B981 (green-500)

/* Sunny Weather */
--weather-sunny: #FBBF24 (yellow-400)

/* Cloudy Weather */
--weather-cloudy: #6B7280 (gray-500)
```

### Interactive States
```css
/* Hover States */
--hover-overlay: rgba(0, 0, 0, 0.05)
--hover-bg: #F9FAFB (gray-50)

/* Active/Selected */
--active-bg: #111827 (gray-900)
--active-text: #FFFFFF (white)

/* Focus Ring */
--ring: #020617 (hsl(222.2 84% 4.9%))
```

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Sizes & Weights

#### Headings
```css
/* H1 - Page Title */
font-size: 1.5rem (24px)
font-weight: 600 (semibold)
line-height: 2rem (32px)
class: text-2xl font-semibold

/* H2 - Section Title */
font-size: 1.25rem (20px)
font-weight: 600 (semibold)
line-height: 1.75rem (28px)
class: text-xl font-semibold

/* H3 - Card Title */
font-size: 1.125rem (18px)
font-weight: 600 (semibold)
line-height: 1.75rem (28px)
class: text-lg font-semibold

/* H4 - Small Heading */
font-size: 1rem (16px)
font-weight: 600 (semibold)
line-height: 1.5rem (24px)
class: text-base font-semibold
```

#### Body Text
```css
/* Large Body */
font-size: 1rem (16px)
font-weight: 400 (normal)
line-height: 1.5rem (24px)
class: text-base

/* Regular Body */
font-size: 0.875rem (14px)
font-weight: 400 (normal)
line-height: 1.25rem (20px)
class: text-sm

/* Small Text */
font-size: 0.75rem (12px)
font-weight: 400 (normal)
line-height: 1rem (16px)
class: text-xs

/* Tiny Text */
font-size: 0.625rem (10px)
font-weight: 400 (normal)
class: text-[10px]
```

#### Display Numbers (Stats/KPIs)
```css
/* Large Number */
font-size: 2.25rem (36px)
font-weight: 700 (bold)
class: text-4xl font-bold

/* Medium Number */
font-size: 1.5rem (24px)
font-weight: 700 (bold)
class: text-2xl font-bold

/* Small Number */
font-size: 1.125rem (18px)
font-weight: 600 (semibold)
class: text-lg font-semibold
```

#### Labels & Metadata
```css
/* Section Label (Uppercase) */
font-size: 0.75rem (12px)
font-weight: 500 (medium)
text-transform: uppercase
letter-spacing: 0.05em (tracking-wide)
color: #9CA3AF (gray-400)
class: text-xs font-medium text-gray-400 uppercase tracking-wide
```

---

## Spacing & Layout

### Spacing Scale (Tailwind)
```css
0.5 = 0.125rem (2px)
1   = 0.25rem (4px)
2   = 0.5rem (8px)
3   = 0.75rem (12px)
4   = 1rem (16px)
5   = 1.25rem (20px)
6   = 1.5rem (24px)
8   = 2rem (32px)
10  = 2.5rem (40px)
12  = 3rem (48px)
```

### Component Spacing Standards

#### Cards
```css
Padding: p-6 (24px)
Gap between elements: space-y-4 (16px)
Margin between cards: gap-4 or gap-6 (16px or 24px)
```

#### Sections
```css
Vertical spacing between sections: space-y-6 (24px)
Section padding: py-6 px-4 (mobile) or py-8 px-6 (desktop)
```

#### Container/Page
```css
Max width: max-w-md (mobile-first) or max-w-7xl (desktop)
Horizontal padding: px-4 (mobile) or px-6 (desktop)
Margin: mx-auto (center alignment)
```

#### Layout Structure
```css
/* Sidebar */
Width: 13rem (208px / w-52)
Position: fixed left-0 top-0
Height: h-screen

/* Main Content Area */
Margin-left: ml-52 (when sidebar visible)
Padding: p-6

/* Mobile Navigation */
Height: h-16 (64px)
Position: fixed bottom-0
Padding-bottom: pb-safe (for iOS safe area)
```

---

## Components

### Card Component
```tsx
// Base card with shadow
<Card className="border-none shadow-lg">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// Gradient card (for stats)
<Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-none shadow-lg">
  {/* White text content */}
</Card>
```

### Button Component
```tsx
// Primary button
<Button className="bg-gray-900 hover:bg-gray-800 text-white">
  Action
</Button>

// Secondary button
<Button variant="outline">
  Action
</Button>

// Ghost button
<Button variant="ghost">
  Action
</Button>
```

### Badge Component
```tsx
// Default badge
<Badge>Label</Badge>

// Secondary badge
<Badge variant="secondary">Label</Badge>

// Colored badges
<Badge className="bg-green-100 text-green-700">Active</Badge>
<Badge className="bg-blue-100 text-blue-700">Pending</Badge>
<Badge className="bg-red-100 text-red-700">Error</Badge>
```

### Input Component
```tsx
<Input 
  type="text" 
  placeholder="Search..." 
  className="border-gray-200 focus:ring-2 focus:ring-gray-900"
/>
```

### Table Structure
```tsx
<div className="border rounded-lg overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-50 border-b">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
          Column
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3 text-sm">Data</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Icons

### Icon Library
**Package**: `lucide-react`

### Common Icons Used
```tsx
import {
  Home,           // Homepage/Dashboard
  LayoutDashboard, // Dashboard section
  Sprout,         // Crops
  CloudRain,      // Weather
  User,           // Profile
  Bell,           // Notifications
  Settings,       // Settings
  Search,         // Search
  ChevronDown,    // Dropdown
  TrendingUp,     // Increase indicator
  TrendingDown,   // Decrease indicator
  Sun,            // Sunny weather
  Cloud,          // Cloudy weather
  ThermometerSun, // Temperature
  Wind,           // Wind
  Droplets,       // Humidity/Rainfall
  FileText,       // Documents
  Plus,           // Add action
  Filter,         // Filter
  MoreVertical,   // Menu (3 dots)
  ChevronLeft,    // Back navigation
  X,              // Close
} from 'lucide-react';
```

### Icon Sizing Standards
```tsx
// Small icon (in badges, inline)
<Icon className="w-4 h-4" />

// Regular icon (in buttons, nav)
<Icon className="w-5 h-5" />

// Medium icon (in cards, headers)
<Icon className="w-6 h-6" />

// Large icon (weather cards, feature displays)
<Icon className="w-12 h-12" />

// Icon button background
<div className="p-3 bg-purple-100 rounded-lg">
  <Icon className="w-6 h-6 text-purple-600" />
</div>
```

---

## Charts & Data Visualization

### Chart Library
**Package**: `recharts`

### Chart Configuration Standards

#### Line Chart (Time Series)
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
    <XAxis 
      dataKey="name" 
      stroke="#9CA3AF"
      fontSize={12}
    />
    <YAxis 
      stroke="#9CA3AF"
      fontSize={12}
    />
    <Tooltip />
    <Legend />
    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="#A855F7"
      strokeWidth={2}
      dot={{ fill: '#A855F7', r: 4 }}
    />
  </LineChart>
</ResponsiveContainer>
```

#### Bar Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
    <XAxis 
      dataKey="name" 
      stroke="#9CA3AF"
      fontSize={12}
    />
    <YAxis 
      stroke="#9CA3AF"
      fontSize={12}
    />
    <Tooltip />
    <Legend />
    <Bar 
      dataKey="value" 
      fill="#60A5FA"
      radius={[12, 12, 0, 0]}
      barSize={40}
    />
  </BarChart>
</ResponsiveContainer>
```

#### Pie Chart
```tsx
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
```

#### Chart Colors Array
```tsx
const CHART_COLORS = [
  '#A855F7', // purple-500
  '#60A5FA', // blue-400
  '#10B981', // green-500
  '#F59E0B', // amber-500
  '#EC4899', // pink-500
  '#06B6D4', // cyan-500
];
```

---

## Shadows & Elevation

### Shadow Scale
```css
/* Small shadow (subtle elevation) */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)
class: shadow-sm

/* Default shadow (cards) */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
class: shadow

/* Medium shadow (elevated cards) */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
class: shadow-md

/* Large shadow (modals, popovers) */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
class: shadow-lg

/* Extra large shadow (emphasis) */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
class: shadow-xl
```

### Usage Guidelines
```tsx
// Regular cards
<Card className="shadow-lg">

// Hover state
<Card className="shadow-lg hover:shadow-xl transition-shadow">

// Gradient cards (stats)
<Card className="shadow-lg">

// Floating elements (tooltips, dropdowns)
<div className="shadow-2xl">
```

---

## Border Radius

### Border Radius Scale
```css
--radius: 0.5rem (8px)

/* Small radius */
border-radius: calc(var(--radius) - 4px) = 4px
class: rounded-sm

/* Medium radius (default) */
border-radius: calc(var(--radius) - 2px) = 6px
class: rounded-md or rounded

/* Large radius */
border-radius: var(--radius) = 8px
class: rounded-lg

/* Extra large radius */
border-radius: 0.75rem (12px)
class: rounded-xl

/* Full radius (pills, avatars) */
border-radius: 9999px
class: rounded-full
```

### Component-Specific Radii
```tsx
// Cards
<Card className="rounded-lg">

// Buttons
<Button className="rounded-md">

// Badges/Pills
<Badge className="rounded-full">

// Bar charts (top corners only)
radius={[12, 12, 0, 0]}

// Icon backgrounds
<div className="rounded-lg">

// Avatars
<div className="rounded-full">
```

---

## Responsive Breakpoints

### Tailwind Breakpoints
```css
/* Small devices (mobile) */
sm: 640px

/* Medium devices (tablets) */
md: 768px

/* Large devices (laptops) */
lg: 1024px

/* Extra large devices (desktops) */
xl: 1280px

/* 2XL devices (large desktops) */
2xl: 1536px

/* Custom container max */
2xl: 1400px (for container)
```

### Mobile-First Approach
```tsx
// Always start with mobile, then add larger breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// Hide on mobile, show on desktop
<div className="hidden lg:block">

// Show on mobile, hide on desktop
<div className="lg:hidden">

// Responsive padding
<div className="px-4 lg:px-6">

// Responsive text size
<h1 className="text-xl lg:text-2xl">
```

### Layout Breakpoint Strategy
```tsx
// Sidebar: Hidden on mobile, visible on desktop
<Sidebar className="hidden lg:flex" />

// Mobile Nav: Visible on mobile, hidden on desktop
<MobileNav className="lg:hidden" />

// Grid layouts
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3-4 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
```

---

## Implementation Guide

### Getting Started

#### 1. Install Dependencies
```bash
npm install lucide-react recharts class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot @radix-ui/react-dropdown-menu
npm install tailwindcss-animate
```

#### 2. Tailwind Configuration
Copy the `tailwind.config.ts` and `postcss.config.js` from the frontend directory.

#### 3. CSS Variables
Copy all CSS variables from `src/index.css`.

#### 4. Utility Functions
Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### 5. shadcn/ui Components
Copy these components from `src/components/ui/`:
- `card.tsx`
- `button.tsx`
- `badge.tsx`
- `input.tsx`
- Any other UI components needed

### Admin Dashboard Specific Considerations

#### Color Differentiation
Consider using a different accent color for admin to distinguish it from the farmer dashboard:
```css
/* Admin Primary Color - Emerald/Teal */
--admin-primary: #10B981 (green-500)
--admin-primary-light: #D1FAE5 (green-100)

/* Or use Indigo */
--admin-primary: #6366F1 (indigo-500)
--admin-primary-light: #E0E7FF (indigo-100)
```

#### Admin-Specific Components
```tsx
// Admin dashboard cards might have different styling
<Card className="border-l-4 border-l-green-500">

// Admin action buttons
<Button className="bg-green-600 hover:bg-green-700">

// Admin badges
<Badge className="bg-green-100 text-green-700">Admin</Badge>
```

#### Tables for Admin
Admin will likely have more complex tables:
```tsx
// With actions column
<td className="px-4 py-3 text-right">
  <Button variant="ghost" size="sm">Edit</Button>
  <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
</td>

// With status indicators
<Badge className="bg-green-100 text-green-700">Active</Badge>
<Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
<Badge className="bg-red-100 text-red-700">Inactive</Badge>
```

---

## Design Principles

### Consistency
- Use the same spacing scale throughout
- Stick to the defined color palette
- Maintain consistent border radii
- Use the same font weights for similar elements

### Hierarchy
- Size matters: Larger elements = more important
- Weight matters: Bolder text = more important
- Color matters: Darker = more important

### Accessibility
- Maintain color contrast ratios (WCAG AA: 4.5:1 for text)
- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation works

### Performance
- Use Tailwind's purge/content configuration
- Lazy load charts and heavy components
- Optimize images
- Use proper React memoization

---

## File Structure Reference

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   └── input.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── dashboard/       # Dashboard-specific
│   │   ├── weather/         # Weather components
│   │   └── crops/           # Crops components
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Crops.tsx
│   │   └── Weather.tsx
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx
│   ├── index.css            # Global styles + CSS variables
│   └── main.tsx
├── tailwind.config.ts       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

---

## Quick Reference Cheat Sheet

### Common Class Combinations

```tsx
// Page container
<div className="space-y-6">

// Section header
<div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold">Title</h2>
  <Badge variant="secondary">Count</Badge>
</div>

// Grid of cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Stat card
<Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-none shadow-lg">
  <CardContent className="pt-6">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-white/20 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-white/80">Label</p>
        <p className="text-2xl font-bold text-white">Value</p>
      </div>
    </div>
  </CardContent>
</Card>

// Table row hover
<tr className="hover:bg-gray-50 transition-colors">

// Button with icon
<Button className="flex items-center gap-2">
  <Icon className="w-4 h-4" />
  <span>Action</span>
</Button>
```

---

## Version
**Document Version**: 1.0  
**Last Updated**: November 2025  
**Maintained by**: Frontend Team

---

## Need Help?
- Check the existing components in `src/components/`
- Reference the Figma design for visual consistency
- Use Tailwind CSS documentation: https://tailwindcss.com/docs
- shadcn/ui documentation: https://ui.shadcn.com
- Recharts documentation: https://recharts.org

