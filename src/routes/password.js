const express = require("express");
const changepasswordRouter = express.Router();
const User = require("../model/user");
const { userauth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");

// POST /change-password
changepasswordRouter.post("/change-password", userauth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Ensure both fields are provided
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Both current and new password are required" });
        }

        const userId = req.user.id; // set by userauth middleware
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Save updated password
        await user.save();

        return res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = changepasswordRouter;
