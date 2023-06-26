import express from "express";
import { createUser, deleteUser, updateUser, getUser, getAllUser } from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkAuth", verifyToken, (req, res, next) => {
    res.send("Successfully logged in")
})

router.get("/checkUser/:id", verifyUser, (req, res, next) => {
    res.send("Welcome User")
})

router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {

    const isAdmin = req.user.isAdmin;
  
    if (isAdmin) {
        res.send("Welcome Admin");
    } 
    else {
        res.status(403).send("You are not authorized");
    }
});
  

// Create
router.post("/", verifyUser, createUser)

// Update
router.put("/:id", verifyUser, updateUser)

// Delete
router.delete("/:id", verifyUser, deleteUser)

// Get
router.get("/:id", verifyUser, getUser)

// Get All
router.get("/", verifyUser, getAllUser)

export default router