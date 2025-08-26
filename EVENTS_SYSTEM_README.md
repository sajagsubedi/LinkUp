# LinkUp Events System

This document describes the implementation of the events system for LinkUp, including the `useLearnerEvents` hook and integration with the Learners Event page.

## 🚀 Features

### For Learners:
- **Browse Events**: View all active events from the community
- **Search & Filter**: Search by title/description and filter by category
- **Join Events**: Register for events with real-time capacity checking
- **Leave Events**: Unregister from events you've joined
- **Real-time Updates**: See current attendee counts and availability

### For Contributors:
- **Create Events**: Add new events with images, details, and capacity limits
- **Manage Events**: Edit and delete your own events
- **Track Attendance**: Monitor how many people join your events

## 🏗️ Architecture

### Database Tables

#### `events` Table
- `id`: Unique identifier (UUID)
- `title`: Event title
- `description`: Event description
- `image_url`: Event image URL
- `location`: Event location
- `date`: Event date
- `time`: Event time
- `category`: Event category (Career, Workshop, Education, etc.)
- `organizer`: Event organizer name
- `max_attendees`: Maximum number of attendees
- `attendees`: Current number of attendees
- `is_active`: Whether the event is active
- `contributor_id`: ID of the contributor who created the event

#### `event_registrations` Table
- `id`: Unique identifier (UUID)
- `event_id`: Reference to the event
- `user_id`: Reference to the user
- `registration_date`: When the user registered

### Hooks

#### `useLearnerEvents`
Located at `src/hooks/learner/useLearnerEvents.js`

**Functions:**
- `fetchEvents()`: Get all active events
- `joinEvent(eventId)`: Register user for an event
- `leaveEvent(eventId)`: Unregister user from an event
- `isUserRegistered(eventId)`: Check if user is registered

**State:**
- `events`: Array of all events
- `loading`: Loading state
- `error`: Error state

#### `useContributorEvents`
Located at `src/hooks/contributor/useContributorEvents.js`

**Functions:**
- `addEvent(eventData)`: Create a new event
- `updateEvent(eventId, updates)`: Update an existing event
- `deleteEvent(eventId)`: Delete an event
- `fetchEvents()`: Get contributor's events

## 🔧 Setup Instructions

### 1. Database Setup
Run the SQL script in `database-setup.sql` in your Supabase SQL editor to create the necessary tables and policies.

### 2. Environment Variables
Ensure your Supabase environment variables are properly configured in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Dependencies
The following packages are required:
- `@clerk/clerk-react` - User authentication
- `react-toastify` - Toast notifications
- `lucide-react` - Icons

## 📱 Usage Examples

### Using the Hook in a Component

```jsx
import { useLearnerEvents } from "@/hooks/learner/useLearnerEvents";

const MyComponent = () => {
  const { events, loading, error, joinEvent, leaveEvent } = useLearnerEvents();

  const handleJoin = async (eventId) => {
    const success = await joinEvent(eventId);
    if (success) {
      console.log("Successfully joined event!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <button onClick={() => handleJoin(event.id)}>
            Join Event
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 🎨 UI Components

### Event Cards
- **Image**: Event image with fallback to placeholder
- **Category Badge**: Color-coded category indicator
- **Registration Status**: Checkmark for joined events
- **Action Button**: Join/Leave button with real-time state
- **Capacity Indicator**: Shows current vs. maximum attendees

### Search & Filter
- **Search Bar**: Search by event title or description
- **Category Filter**: Dropdown to filter by event type
- **Real-time Results**: Instant filtering as you type

## 🔒 Security Features

### Row Level Security (RLS)
- **Events**: Anyone can read active events, contributors can manage their own
- **Registrations**: Users can only see and manage their own registrations

### Data Validation
- **Capacity Checking**: Prevents joining full events
- **Duplicate Prevention**: Users can't register for the same event twice
- **User Authentication**: All operations require valid user session

## 🚨 Error Handling

### Toast Notifications
- **Success**: Confirmation messages for successful actions
- **Error**: Clear error messages for failed operations
- **Info**: Informational messages (e.g., already registered)

### Fallback States
- **Loading**: Spinner while fetching data
- **Error**: Error message with retry option
- **Empty**: Friendly message when no events found

## 🔄 State Management

### Local State
- **Search Term**: Current search query
- **Category Filter**: Selected category filter
- **User Registrations**: Set of events user has joined

### Real-time Updates
- **Attendee Counts**: Automatically updated when users join/leave
- **Registration Status**: Real-time join/leave button states
- **Event List**: Refreshed after successful operations

## 🧪 Testing Considerations

### Unit Tests
- Test hook functions with mock Supabase client
- Test error handling and edge cases
- Test state updates and side effects

### Integration Tests
- Test complete user flows (join/leave events)
- Test search and filtering functionality
- Test error scenarios and recovery

## 🚀 Future Enhancements

### Planned Features
- **Event Reminders**: Email/SMS notifications before events
- **Waitlist System**: Queue for full events
- **Event Analytics**: Detailed attendance and engagement metrics
- **Social Features**: Share events, invite friends
- **Calendar Integration**: Add events to personal calendar

### Performance Optimizations
- **Pagination**: Load events in chunks for large lists
- **Caching**: Cache event data to reduce API calls
- **Real-time Updates**: WebSocket integration for live updates
- **Image Optimization**: Lazy loading and compression

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Clerk Authentication](https://clerk.com/docs)
