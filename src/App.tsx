import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/learner/HomePage";
import PublicLayout from "./components/layouts/PublicLayout";
import EventsPage from "./pages/learner/EventsPage";
import ClubsPage from "./pages/learner/ClubsPage";
import ProfilePage from "./pages/learner/ProfilePage";
import InternshipPage from "./pages/learner/InternshipPage";
import DashboardRedirection from "./pages/dashboardRedirection";
import ContributorHomePage from "./pages/contributor/ContributorHomePage";
import ContributorEventsPage from "./pages/contributor/ContributorEventsPage";
import ContributorClubsPage from "./pages/contributor/ContributorClubsPage";
import ContributorInternshipPage from "./pages/contributor/ContributorInternshipPage";
import ContributorMentorsPage from "./pages/contributor/ContributorMentorsPage";
import ContributorLayout from "./components/layouts/ContributorLayout";
import ProtectedRoute from "./components/layouts/ProtectedRoute";

const App = () => {
  return (
    <main>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <PublicLayout>
                <LandingPage />
              </PublicLayout>
            }
          />
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicLayout>
                <SignUpPage />
              </PublicLayout>
            }
          />

          <Route path="/dashboard" element={<DashboardRedirection />} />

          {/* Learner dashboard */}
          <Route path="/learner/dashboard">
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="clubs" element={<ClubsPage />} />
            <Route path="internship" element={<InternshipPage />} />
          </Route>

          {/* Contributor dashboard*/}
          <Route path="/contributor/dashboard">
            <Route
              index
              element={<ContributorLayout children={<ContributorHomePage />} />}
            />
            <Route
              path="events"
              element={
                <ContributorLayout children={<ContributorEventsPage />} />
              }
            />
            <Route
              path="clubs"
              element={
                <ContributorLayout children={<ContributorClubsPage />} />
              }
            />
            <Route
              path="internship"
              element={
                <ContributorLayout children={<ContributorInternshipPage />} />
              }
            />
            <Route
              path="mentorship"
              element={
                <ContributorLayout children={<ContributorMentorsPage />} />
              }
            />
          </Route>

          <Route
            path="/user/profile"
            element={<ProtectedRoute children={<ProfilePage />} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
