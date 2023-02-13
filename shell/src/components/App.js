import React, { lazy, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { remote1RoutingPrefix, remote2RoutingPrefix } from '../routing/constants';

const Remote1Router = lazy(() => import('remote1/Router'));
const Remote2Router = lazy(() => import('remote2/Router'));

export default () => {
  const location = useLocation()
  const navigate = useNavigate()

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
    window.addEventListener("[remote1] navigated", remote1NavigationEventHandler);

    return () => {
      window.removeEventListener(
        "[remote1] navigated",
        remote1NavigationEventHandler
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
          <Link to={`/${remote1RoutingPrefix}`}>Remote1 router</Link>
        </li>
        <li>
          <Link to={`/${remote2RoutingPrefix}`}>Remote2 router</Link>
        </li>
      </ul>
  
      <Routes>
        <Route path={`/${remote1RoutingPrefix}/*`} element={
          <React.Suspense fallback={<h1>Loading Remote1 router....</h1>}>
            <Remote1Router initialPathname={location.pathname.replace(`/${remote1RoutingPrefix}`, '')} />
          </React.Suspense>
        } />
        <Route path={`/${remote2RoutingPrefix}/*`} element={
          <React.Suspense fallback={<h1>Loading Remote2 page....</h1>}>
            <Remote2Router initialPathname={location.pathname.replace(`/${remote2RoutingPrefix}`, '')} />
          </React.Suspense>
        } />
      </Routes>
    </div >
  )
};
