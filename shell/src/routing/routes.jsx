import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom'
import { remote1RoutingPrefix, remote2RoutingPrefix } from './constants';

const Remote1Lazy = lazy(() => import("remote1/Index"));
const Remote2Lazy = lazy(() => import("remote2/Index"));

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={`/${remote1RoutingPrefix}`} />,
      },
      {
        path: `/${remote1RoutingPrefix}/*`,
        element: <Suspense fallback="Loading App1..."><Remote1Lazy /></Suspense>,
      },
      {
        path: `/${remote2RoutingPrefix}/*`,
        element: <Suspense fallback="Loading App2..."><Remote2Lazy /></Suspense>,
      },
    ],
  }
];