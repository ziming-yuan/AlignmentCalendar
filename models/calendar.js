import mongoose, { Schema, models } from "mongoose";

const calendarSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    path: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    isActive: {
        type: Boolean,
        default: false
    },
    titleTextColor: { type: String, default: '#000000' },
    backgroundImage: {
        fileUrl: { type: String },
        fileKey: { type: String }
    },
    backgroundColor: { type: String, default: '#FFFFFF' },
    logoImage: {
        fileUrl: { type: String },
        fileKey: { type: String }
    },
});

const Calendar = models.Calendar || mongoose.model("Calendar", calendarSchema);
export default Calendar;