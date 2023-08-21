import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
{
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }]
},
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;