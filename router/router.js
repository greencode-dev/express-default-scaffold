import express from "express";
import controller from "../controller/controller.js";

const router = express.Router();

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;  