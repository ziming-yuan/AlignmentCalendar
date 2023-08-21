import mongoose, { Schema, models } from "mongoose";

const doorSchema = new Schema({
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    date: { type: Date, required: true },
    text: { type: String },
    message: { type: String },
    youtubeVideoId: { type: String },
    photoUrl: { type: String },
    textColor: { type: String, default: '#000' },
    backgroundColor: { type: String, default: '#FFF' },
    closedDoorPhotoUrl: { type: String },
    autoOpenTime: { type: Date }
});

const Door = models.Door || mongoose.model("Door", doorSchema);
export default Door;