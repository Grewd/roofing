# REXE Smart Roofing - Authentication System

## Overview

The REXE Smart Roofing Management System now includes a complete authentication system with login/logout functionality. Users must authenticate before accessing the dashboard and any protected pages.

## Demo Credentials

Three demo user accounts are available for testing:

### Admin Account
- **Email:** `admin@rexe.ke`
- **Password:** `password123`
- **Role:** Admin
- **Access:** Full system access to all features

### Manager Account
- **Email:** `manager@rexe.ke`
- **Password:** `password123`
- **Role:** Manager
- **Access:** Project oversight and team management

### Supervisor Account
- **Email:** `supervisor@rexe.ke`
- **Password:** `password123`
- **Role:** Supervisor
- **Access:** Site-level management and task assignments

## How It Works

### Authentication Flow

1. **Initial Visit:** Users are redirected to the login page (`/login`)
2. **Login:** Users enter their email and password from the demo credentials
3. **Session:** Upon successful login, user data is stored in localStorage
4. **Dashboard Access:** Users can now access all protected pages (/, /projects, /clients, /catalog, /inventory, /staff, /inspections, /estimator)
5. **Logout:** Users can click the "Logout" button in the sidebar footer to clear the session and return to the login page

### Technical Implementation

#### AuthContext (`components/auth-context.tsx`)
- Manages user authentication state using React Context
- Provides `login()` and `logout()` functions
- Persists user data in localStorage for session recovery
- Tracks loading state during authentication

#### RouteGuard (`components/route-guard.tsx`)
- Client-side route protection component
- Automatically redirects unauthenticated users to `/login`
- Shows loading spinner while checking authentication status
- Wraps all protected pages

#### Login Page (`app/login/page.tsx`)
- Professional login interface with REXE branding
- Email and password input fields
- Demo account quick-login buttons
- Error handling for invalid credentials
- Responsive design with gradient background

#### Sidebar Updates (`components/sidebar.tsx`)
- Displays logged-in user's email and role
- Functional logout button that clears session and redirects to login
- Shows user's avatar with email initials

## Protected Pages

The following pages require authentication:

- `/` - Dashboard
- `/projects` - Projects Management
- `/clients` - Client Management
- `/catalog` - Product Catalog
- `/inventory` - Inventory Management
- `/staff` - Staff & Tasks
- `/inspections` - Quality Inspections
- `/estimator` - Cost Estimator

## Session Management

- **Storage:** User sessions are stored in browser localStorage under the key `rexe_user`
- **Persistence:** Sessions persist across browser refreshes until the user logs out
- **Security Note:** This is a demo implementation using localStorage. In production, use secure HTTP-only cookies and server-side sessions

## Testing the Authentication

### Test Login Flow
1. Navigate to the application
2. You should be redirected to `/login`
3. Click one of the demo account buttons (Admin, Manager, or Supervisor)
4. You should be logged in and redirected to the dashboard
5. Your email and role should appear in the sidebar footer

### Test Logout Flow
1. From any protected page, click the "Logout" button in the sidebar footer
2. You should be redirected to the login page
3. localStorage should be cleared
4. Attempting to go back should redirect you to login again

### Test Session Persistence
1. Log in with a demo account
2. Refresh the page
3. You should remain logged in (session is retrieved from localStorage)

## Future Enhancements

For production deployment, consider:
- Integration with a proper authentication service (Auth.js, Supabase Auth, Firebase, etc.)
- Secure password hashing and verification
- HTTP-only cookie-based sessions
- Role-based access control (RBAC) with permission checking
- Audit logging for security events
- Multi-factor authentication (MFA)
- Session timeout and refresh token handling
