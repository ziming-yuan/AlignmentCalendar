import mongoose, { Schema, models } from "mongoose";

const doorSchema = new Schema({
    calendarId: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' },
    date: { type: Date, required: true },
    message: { type: String },
    youtubeVideoUrl: { type: String },
    contentImage: {
        fileUrl: { type: String },
        fileKey: { type: String }
    },
    closedDoorText: { type: String },
    closedDoorTextColor: { type: String, default: '#000000' },
    closedDoorImage: {
        fileUrl: { type: String },
        fileKey: { type: String }
    },
    closedDoorColor: { type: String, default: '#FFFFFF' },
    autoOpenTime: { type: Date }
});

const Door = models.Door || mongoose.model("Door", doorSchema);
export default Door;