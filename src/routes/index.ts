import { Router } from "express";
import imageRouter from "./images";
import uploadRouter from "./upload";

const router = Router({ mergeParams: true });
router.use("/", imageRouter);
router.use("/file" , uploadRouter);

export default router;
