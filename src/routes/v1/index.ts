import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import userRouter from "./userRoutes";
import friendRouter from "./friendRoutes";
import planRouter from "./planRoutes";
import inviteRouter from "./inviteRoutes";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/docs",
    router: docsRouter,
  },
  {
    path: "/friend",
    router: friendRouter,
  },
  {
    path: "/plan",
    router: planRouter,
  },
  {
    path: "/invite",
    router: inviteRouter,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
