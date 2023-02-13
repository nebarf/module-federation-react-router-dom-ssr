import React, { lazy, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  remote1RoutingPrefix,
  remote2RoutingPrefix,
} from "../routing/constants";

const Remote1Index = lazy(() => import("remote1/Index"));
const Remote2Index = lazy(() => import("remote2/Index"));

const Remote1Suspense = ({ initialPathname }) => (
  <React.Suspense fallback={<h1>Loading Remote1 router....</h1>}>
    <Remote1Index initialPathname={initialPathname} />
  </React.Suspense>
);
const Remote2Suspense = ({ initialPathname }) => (
  <React.Suspense fallback={<h1>Loading Remote2 page....</h1>}>
    <Remote2Index initialPathname={initialPathname} />
  </React.Suspense>
);

const remote1Basename = `/${remote1RoutingPrefix}`;
const remote2Basename = `/${remote2RoutingPrefix}`;

export default () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Listen to navigation events dispatched from remote1 mfe.
  useEffect(() => {
    const remote1NavigationEventHandler = (event) => {
      const pathname = event.detail;
      const newPathname = `${remote1Basename}${pathname}`;
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener(
      "[remote1] navigated",
      remote1NavigationEventHandler
    );

    return () => {
      window.removeEventListener(
        "[remote1] navigated",
        remote1NavigationEventHandler
      );
    };
  }, [location.pathname]);

  // Listen to navigation events dispatched from remote2 mfe.
  useEffect(() => {
    const remote2NavigationEventHandler = (event) => {
      const pathname = event.detail;
      const newPathname = `${remote2Basename}${pathname}`;
      if (newPathname === location.pathname) {
        return;
      }
      navigate(newPathname);
    };
    window.addEventListener(
      "[remote2] navigated",
      remote2NavigationEventHandler
    );

    return () => {
      window.removeEventListener(
        "[remote1] navigated",
        remote2NavigationEventHandler
      );
    };
  }, [location.pathname]);

  return (
    <div>
      <Helmet>
        <title>RRD-SSR MF Example</title>
      </Helmet>
      <ul>
        <li>
          <Link to={`/${remote1RoutingPrefix}`}>Remote1 index</Link>
        </li>
        <li>
          <Link to={`/${remote2RoutingPrefix}`}>Remote2 index</Link>
        </li>
      </ul>

      <Routes>
        <Route index element={<Remote1Suspense />} />
        <Route
          path={`/${remote1RoutingPrefix}/*`}
          element={
            <Remote1Suspense
              initialPathname={location.pathname.replace(
                `/${remote1RoutingPrefix}`,
                ""
              )}
            />
          }
        />
        <Route
          path={`/${remote2RoutingPrefix}/*`}
          element={
            <Remote2Suspense
              initialPathname={location.pathname.replace(
                `/${remote2RoutingPrefix}`,
                ""
              )}
            />
          }
        />
      </Routes>
    </div>
  );
};
