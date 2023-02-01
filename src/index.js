import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const HomeComponent = React.lazy(() => import('./components/Home.component'));
const CreateFormComponent = React.lazy(() => import('./components/CreateForm.component'));
const DynamicFormComponent = React.lazy(() => import('./components/Dynamicform.component'));
const ViewResponseComponent = React.lazy(() => import('./components/ViewResponse.component'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<div>Loading...</div>}><HomeComponent /></Suspense>,
  },
  {
    path: "create-page",
    element: <Suspense fallback={<div>Loading...</div>}><CreateFormComponent /></Suspense>,
  },
  {
    path: "dynamic-form",
    element: <Suspense fallback={<div>Loading...</div>}><DynamicFormComponent /></Suspense>,
  },
  {
    path: "view-response",
    element: <Suspense fallback={<div>Loading...</div>}><ViewResponseComponent /></Suspense>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
