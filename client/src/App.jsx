import { Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import { getUser } from "./utils/auth";

// Public pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Common pages
import Plans from "./pages/Plans";
import PlanDetails from "./pages/PlanDetails";
import Feed from "./pages/Feed";
import MySubscriptions from "./pages/MySubscriptions";
import Trainers from "./pages/Trainers";

// Trainer pages
import Dashboard from "./pages/Dashboard";
import CreatePlan from "./pages/CreatePlan";
import EditPlan from "./pages/EditPlan";
import TrainerProfile from "./pages/TrainerProfile";

function App() {
  const user = getUser();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }
  
  return (
    <Routes>

      <Route element={<PageLayout />}>

        <Route index element={<Navigate to="/plans" />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plans/:planId" element={<PlanDetails />} />
        <Route path="/trainer/:trainerId" element={<TrainerProfile />} />

        {user.role === "user" && (
          <>
            <Route path="/feed" element={<Feed />} />
            <Route path="/my-subscriptions" element={<MySubscriptions />} />
            <Route path="/trainers" element={<Trainers />} />
          </>
        )}

        {user.role === "trainer" && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/create-plan" element={<CreatePlan />} />
            <Route path="/dashboard/edit-plan/:id" element={<EditPlan />} />
          </>
        )}

        <Route
          path="*"
          element={
            <Navigate
              to={user.role === "trainer" ? "/dashboard" : "/plans"}
            />
          }
        />

      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

    </Routes>
  );
}

export default App;
