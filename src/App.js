import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Registerscreen from "./pages/Registerscreen";
import Loginscreen from "./pages/Loginscreen";

// import Homescreen from "./pages/Homescreen";
import Bookingscreen from "./pages/Bookingscreen";
import Profilescreen from "./pages/Profilescreen";
import Adminscreen from "./pages/Adminscreen";
import Managerscreen from "./pages/Managerscreen";
import OrderFood from "./pages/OrderFood";
import Talkscreen from "./pages/Talkscreen";

import Error from "./components/Error";
import { Smooth } from "./context";
import { useContext, Suspense, lazy } from "react";

const Homescreen = lazy(() => import("./pages/Homescreen"));
// const Bookingscreen = lazy(() => import("./pages/Bookingscreen"));
// const Profilescreen = lazy(() => import("./pages/Profilescreen"));
// const Adminscreen = lazy(() => import("./pages/Adminscreen"));
// const Managerscreen = lazy(() => import("./pages/Managerscreen"));
// const OrderFood = lazy(() => import("./pages/OrderFood"));
// const Talkscreen = lazy(() => import("./pages/Talkscreen"));

function App() {
  const { data } = useContext(Smooth);
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/register" element={<Registerscreen />} />
          <Route path="/login" element={<Loginscreen />} />

          {data.metaInfo?.role === "user" && (
            <>
              <Route
                path="/book/:roomid/:fromdate/:todate"
                element={<Bookingscreen />}
              />
              <Route path="/profile" element={<Profilescreen />} />
              <Route path="/orderfood" element={<OrderFood />} />
              <Route path="/complaint" element={<Talkscreen />} />
            </>
          )}

          {data.metaInfo?.role === "admin" && (
            <>
              <Route path="/admin" element={<Adminscreen />} />
            </>
          )}

          {data.metaInfo?.role === "manager" && (
            <>
              <Route path="/orderfood" element={<OrderFood />} />
              <Route path="/manager" element={<Managerscreen />} />
            </>
          )}
          <Route
            path="*"
            element={
              <Error message="Not found page" spaceM="mt-5" spaceP="py-5" />
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
