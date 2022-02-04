import { Router } from "express";
import imageRouter from "./images";

const router = Router({ mergeParams: true });
router.use("/", imageRouter);

export default router;
