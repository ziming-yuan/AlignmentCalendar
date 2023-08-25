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
    titleTextColor: { type: String, default: '#000' },
    titleBackgroundColor: { type: String, default: '#FFF' },
    backgroundPhoto: { type: String },
    logoImage: { type: String },
});

const Calendar = models.Calendar || mongoose.model("Calendar", calendarSchema);
export default Calendar;