import { createBrowserRouter } from "react-router-dom";
import Hero from "../pages/Hero";
import Login from "../pages/Login";
import Enroll from "../pages/Enroll";
import shopRoute from "./shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/enroll",
    element: <Enroll/>
  },
  ...shopRoute,  //rest opporater เป็นเหมือนการอ้างอิงไปถึง path อีกไฟล์นึง
]);

export default router;