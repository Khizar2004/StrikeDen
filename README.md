# StrikeDen | Where Champions Train

<p align="center">
  <img src="public/images/logo.png" alt="StrikeDen Logo" width="200" height="auto" />
</p>

## The Story Behind This Project

When I first stepped into Strike Den as a student in 2022, I was just looking to learn MMA and get in shape. What I found was more than a gym - it was a community of dedicated fighters and coaches who immediately felt like family.

I trained there for a brief but impactful 4 months before I had to leave for university. Even after moving away, I kept in touch with the community and followed their growth journey from that humble flat to their impressive new facility in early 2024.

After they moved to their new location, I noticed they were still running their business using WhatsApp groups and Instagram DMs. As a web developer, I saw an opportunity to give back to the place that had given me so much during my short time there.

This website is my way of thanking the entire Strike Den family. What started as a simple scheduling tool grew into a full-featured platform that displays class schedules, trainer profiles, and provides gym management features - my way of staying connected to the Strike Den community even after moving away.

## What This Site Does

- **Class Schedule Management**: Trainers can set up their weekly classes, and students can view availability
- **Trainer Profiles**: Showcases the incredible coaches who make StrikeDen special
- **Light/Dark Mode**: Because training schedules are checked at all hours
- **Responsive Design**: Works great on phones, since most members check schedules between sessions
- **Admin Dashboard**: Gives the gym staff easy control over content
- **Location Maps**: Helps newcomers find this hidden gem in DHA Phase 6

## Technical Implementation

### Admin Dashboard Architecture

The admin dashboard showcases several advanced implementation patterns that would be relevant in any enterprise application:

```javascript
// Custom React hook abstraction for schedule management
export const useSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Optimistic UI updates for immediate user feedback
  const deleteSchedule = async (id) => {
    // Store previous state for potential rollback
    const previousSchedules = [...schedules];
    
    // Immediately update UI for perceived performance
    setSchedules(schedules.filter(schedule => schedule._id !== id));
    
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete schedule');
      }
      
      toast.success('Schedule deleted successfully');
    } catch (error) {
      // Rollback on error
      setSchedules(previousSchedules);
      toast.error(error.message || 'An error occurred while deleting the schedule');
    }
  };
  
  // Additional implementation omitted for brevity
};
```

Key technical features I implemented:

1. **JWT Authentication**: Secure token-based auth with HTTP-only cookies and refresh token flow
2. **Cascading Data Operations**: When deleting a trainer, all associated schedules are automatically removed to maintain data integrity
3. **Database Transactions**: Critical operations use MongoDB transactions to ensure data consistency
4. **Custom Hooks Pattern**: Abstracted complex state management into reusable hook patterns
5. **Role-Based Access Control**: Admin permissions structured to allow future expansion to multi-level access
6. **Rate Limiting**: API endpoints protected against brute-force attacks
7. **Stateless Backend Design**: RESTful API with proper separation of concerns

### Performance Optimizations

I implemented several performance enhancements:

- **Dynamic Imports**: Code-splitting for admin components to reduce initial load time
- **Incremental Static Regeneration**: ISR for public-facing pages with optimal cache strategies
- **React Query**: Efficient data fetching with caching, deduplication and background updates
- **Optimized Image Delivery**: Proper usage of Next.js Image component with Vercel Blob Storage
- **Virtualized Lists**: For large datasets like schedule history views
- **Tailwind JIT**: Minimized CSS footprint with just-in-time compilation

### Security Measures

The application implements numerous security best practices:

- **Data Validation**: Server-side validation using Mongoose schemas and custom validators
- **Cross-Site Request Forgery Protection**: CSRF tokens for sensitive operations
- **Secure Password Recovery**: Cryptographically secure recovery key system
- **Content Security Policy**: Restrictive CSP headers to prevent XSS attacks
- **Database Access Controls**: Principle of least privilege with MongoDB user roles

The admin interface also follows key UX principles for complex systems:

- **Error Boundaries**: Graceful failure modes that preserve user data
- **Optimistic UI**: Immediate feedback with background syncing
- **Intelligent Form Validation**: Real-time validation with helpful error messages
- **Mobile-First Design**: Fully responsive admin interface

## Tech Stack

I built this using modern tools that balance performance with maintainability:

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion
- **Backend**: MongoDB, Mongoose, JWT Auth
- **Media Storage**: Vercel Blob Storage for trainer images
- **Deployment**: Vercel

## Live Site

The site is live at [strike-den.vercel.app](https://strike-den.vercel.app)  
(Soon moving to the official domain: strikeden.pk)

## Local Development

If you want to run this locally:

1. Clone the repo
   ```
   git clone https://github.com/Khizar2004/StrikeDen.git
   cd StrikeDen
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up the environment variables in `.env.local`:
   ```
   MONGODB_URI=your_mongodb_connection
   JWT_SECRET=your_secret_key
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   ADMIN_USERNAME=admin_username
   ADMIN_PASSWORD=admin_password
   ADMIN_RECOVERY_KEY=admin_recovery_key
   ```

4. Start the development server
   ```
   npm run dev
   ```

## Project Structure

The project follows the standard Next.js App Router structure:

```
StrikeDen/
├── app/                    # Pages and API routes
│   ├── admin/              # Admin dashboard 
│   ├── api/                # Backend endpoints
│   ├── classes/            # Class listings
│   └── ...                 # Other pages
├── components/             # Reusable UI components
├── lib/                    # Database models and utilities
├── public/                 # Static assets
└── ...
```

## Lessons I Learned

Building this taught me a lot about:
- Balancing feature requests with what's actually needed
- User authentication and security
- Working with MongoDB in a Next.js environment
- Image storage using Vercel Blob
- Designing interfaces for non-technical users

## Contact

You can reach Strike Den at:
- **Phone**: +92 337 2629350
- **Address**: 2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6, Karachi, Pakistan
- **Instagram**: [@strikeden_pk](https://instagram.com/strikeden_pk)

---

<p align="center">
  Built with ❤️ by Khizar Aamir, proud StrikeDen member.
</p>
