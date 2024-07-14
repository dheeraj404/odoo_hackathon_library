import mongoose from "mongoose";

const { Schema } = mongoose;

const issueRequestSchema = new Schema(
    {
        book_id: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        library_id: {
            type: Schema.Types.ObjectId,
            ref: "Library",
            required: true,
        },
        request_date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

const IssueRequest = mongoose.model("IssueRequest", issueRequestSchema);

export default IssueRequest;
