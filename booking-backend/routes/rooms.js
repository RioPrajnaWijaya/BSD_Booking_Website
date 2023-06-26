import express from "express";
import { createRoom, deleteRoom, updateRoom, getRoom, getAllRoom, countRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/", verifyAdmin, createRoom)

// Update
router.put("/:id", verifyAdmin, updateRoom)

// Delete
router.delete("/:id", verifyAdmin, deleteRoom)

// Get
router.get("/find/:id", getRoom)

// Get All
router.get("/", getAllRoom)

// Count Room
router.get("/countByType", countRoom)

export default router