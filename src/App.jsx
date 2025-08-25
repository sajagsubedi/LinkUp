import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  LandingPage,
  Onboarding,
  HomePage,
  EventsPage,
  ClubsPage,
  InternshipPage,
  DashboardRedirection,
  ContributorHomePage,
  ContributorEventsPage,
  ContributorClubsPage,
  ContributorInternshipPage,
  ContributorMentorsPage,
  MentorshipPage,
} from "@/pages";

import {
  PublicLayout,
  ContributorLayout,
  LearnerLayout,
  ProtectedRoute,
} from "@/components/layouts";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Dashboard redirection
  { path: "/dashboard", element: <DashboardRedirection /> },

  // Learner Dashboard
  {
    path: "/learner/dashboard",
    element: <LearnerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "clubs", element: <ClubsPage /> },
      { path: "internship", element: <InternshipPage /> },
      { path: "mentorship", element: <MentorshipPage /> },
    ],
  },

  // Contributor Dashboard
  {
    path: "/contributor/dashboard",
    element: <ContributorLayout />,
    children: [
      { index: true, element: <ContributorHomePage /> },
      { path: "events", element: <ContributorEventsPage /> },
      { path: "clubs", element: <ContributorClubsPage /> },
      { path: "internship", element: <ContributorInternshipPage /> },
      { path: "mentorship", element: <ContributorMentorsPage /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
