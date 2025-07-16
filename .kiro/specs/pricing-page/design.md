# Design Document

## Overview

The pricing page feature will create a dedicated `/pricing` route that consolidates all class pricing information in a clean, organized layout. The design leverages the existing Strike Den architecture patterns, including Next.js App Router, MongoDB with Mongoose, and the established admin authentication system. The solution extends the current Class schema to support promotional messaging and introduces a new Settings collection for global promotions.

## Architecture

### Directory Structure Changes

```
StrikeDen/
├── app/
│   ├── pricing/                           # 🆕 NEW
│   │   └── page.js                        # 🆕 NEW - Main pricing page
│   ├── admin/
│   │   └── page.js                        # ✏️ MODIFIED - Add global promotion field
│   └── api/
│       └── settings/                      # 🆕 NEW
│           └── route.js                   # 🆕 NEW - Global promotion API
├── components/
│   ├── Navbar.js                          # ✏️ MODIFIED - Add pricing link
│   ├── ClassDetailsModal.js               # ✏️ MODIFIED - Remove pricing section
│   └── PricingCard.js                     # 🆕 NEW - Individual class pricing
└── lib/
    └── Settings.js                        # 🆕 NEW - Settings schema
```

### Frontend Architecture
- **Route Structure**: New `/app/pricing/page.js` following Next.js App Router conventions
- **Component Pattern**: Follows existing component structure with reusable UI components
- **Styling**: Utilizes existing Tailwind CSS classes and design system for consistency
- **State Management**: Client-side state using React hooks for data fetching and UI interactions
- **Responsive Design**: Mobile-first approach matching existing page layouts

### Backend Architecture
- **API Endpoints**: 
  - New `/api/settings` for global promotional management only
- **Database**: MongoDB with Mongoose ODM following existing patterns
- **Authentication**: Leverage existing `adminAuthMiddleware` for admin-only operations
- **Data Validation**: Simple HTML validation for promotional text

### Navigation Integration
- **Navbar Updates**: Add "Pricing" link to both desktop and mobile navigation
- **Active State**: Implement active link highlighting using existing navigation patterns
- **Positioning**: Place "Pricing" between "Classes" and "Trainers" in navigation order

## Components and Interfaces

### New Components

#### PricingPage Component (`/app/pricing/page.js`)
```javascript
// Main pricing page component
- Fetches classes and global promotion data
- Renders hero section with optional global promotion banner
- Displays pricing cards in responsive grid layout
- Handles loading and error states
- Implements Facebook tracking for pricing page views
```

#### PricingCard Component (`/components/PricingCard.js`)
```javascript
// Individual class pricing display component
- Props: classData (object)
- Renders class title, image, and pricing tiers
- Responsive card layout with hover effects
- Handles missing pricing data gracefully
```

#### GlobalPromotionBanner Component (Inline in pricing page)
```javascript
// Global promotion display - simple conditional div
- Renders as inline banner when global promotion exists
- Simple styling with conditional rendering
- No separate component needed
```

### Modified Components

#### Navbar Component (`/components/Navbar.js`)
```javascript
// Add pricing link to navigation
- Desktop navigation: Add "Pricing" link
- Mobile navigation: Add "Pricing" link
- Active state management for /pricing route
- Maintain existing animation and styling patterns
```

#### ClassDetailsModal Component (`/components/ClassDetailsModal.js`)
```javascript
// Remove pricing section from modal
- Remove pricing display logic
- Remove pricing-related JSX
- Add link/button to pricing page for pricing information
- Maintain all other functionality
```

#### ClassForm Component (`/app/admin/components/classes/ClassForm.js`)
```javascript
// No changes needed - class-specific promotions removed from scope
- Existing form remains unchanged
- Focus on class content only
```

### New Admin Integration

#### Admin Dashboard (`/app/admin/page.js`)
```javascript
// Add global promotion field to existing admin page
- Simple textarea field for global promotion
- Character limit with HTML maxlength
- Save functionality integrated into existing admin flow
- No separate admin components needed
```

## Data Models

### New Settings Schema (`/lib/Settings.js`)
```javascript
// Simple schema for global settings
const SettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  updatedBy: {
    type: String,
    default: 'admin'
  }
}, {
  timestamps: true
});

// Global promotion will use key: 'global_promotion'
```

### API Response Interfaces

#### Classes API Response
```javascript
// No changes to classes API - existing structure remains
{
  success: true,
  classes: [
    {
      _id: "...",
      title: "Boxing Fundamentals",
      pricing: { walkIn: 1500, weekly: 5000, monthly: 15000, annual: 150000 },
      // ... other existing fields (no promotion field)
    }
  ]
}
```

#### Settings API Response
```javascript
// New API response for settings
{
  success: true,
  settings: {
    global_promotion: "50% off all classes this week!"
  }
}
```

## Error Handling

### Frontend Error Handling
- **Network Errors**: Display user-friendly error messages with retry options
- **Loading States**: Show skeleton loaders during data fetching
- **Missing Data**: Gracefully handle classes without pricing or promotional data
- **Image Loading**: Fallback to default images for missing class images

### Backend Error Handling
- **Validation Errors**: Return specific error messages for invalid promotional text
- **Database Errors**: Log errors and return generic error messages to clients
- **Authentication Errors**: Proper 401/403 responses for unauthorized access
- **Rate Limiting**: Implement basic rate limiting for promotional updates

### Data Validation
- **Character Limits**: Enforce 200 char limit for class promotions, 300 for global
- **HTML Sanitization**: Prevent XSS attacks in promotional text
- **Required Fields**: Validate required fields in API requests
- **Type Validation**: Ensure proper data types for all fields

## Testing Strategy

### Unit Testing
- **Component Testing**: Test PricingCard component with various data scenarios
- **API Testing**: Test new settings endpoints and extended class endpoints
- **Schema Testing**: Validate new database schema constraints
- **Utility Testing**: Test promotional text validation and sanitization

### Integration Testing
- **Page Navigation**: Test navigation to pricing page from various entry points
- **Admin Workflow**: Test complete admin flow for setting promotions
- **Data Flow**: Test data flow from admin input to frontend display
- **Responsive Testing**: Test pricing page across different device sizes

### End-to-End Testing
- **User Journey**: Test complete user journey from navigation to pricing page
- **Admin Journey**: Test admin setting promotions and seeing results
- **Cross-browser**: Test functionality across major browsers
- **Performance**: Test page load times and data fetching performance

### Test Scenarios
1. **Pricing Display**: Verify all pricing tiers display correctly
2. **Promotional Banners**: Test global and class-specific promotions
3. **Missing Data**: Test behavior with missing pricing or promotional data
4. **Admin Functions**: Test promotional text creation, editing, and deletion
5. **Navigation**: Test pricing page accessibility from all navigation points
6. **Responsive Design**: Test layout on mobile, tablet, and desktop
7. **Error States**: Test error handling for network failures and invalid data

## Implementation Considerations

### Performance Optimization
- **Data Fetching**: Implement efficient data fetching with proper caching
- **Image Optimization**: Use Next.js Image component for class images
- **Code Splitting**: Ensure pricing page components are properly code-split
- **SEO**: Implement proper meta tags and structured data for pricing information

### Accessibility
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Screen Readers**: Implement proper ARIA labels and semantic HTML
- **Color Contrast**: Maintain WCAG AA compliance for all text and backgrounds
- **Focus Management**: Proper focus management for modal and navigation interactions

### Security
- **Input Sanitization**: Sanitize all promotional text input to prevent XSS
- **Admin Authentication**: Ensure promotional features are admin-only
- **Rate Limiting**: Implement rate limiting for promotional updates
- **Data Validation**: Server-side validation for all promotional data

### Deployment Strategy
- **Database Migration**: Plan for adding new fields to existing Class documents
- **Feature Flags**: Consider feature flags for gradual rollout
- **Rollback Plan**: Ensure ability to rollback changes if issues arise
- **Monitoring**: Implement monitoring for new API endpoints and page performance