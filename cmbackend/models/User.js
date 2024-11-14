import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
    createdBy: {
      type: String,
      default: "admin",
    },
    modifiedBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

// Add pre-save middleware to update `modifiedBy` field on document modification
userSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.modifiedBy = this.modifiedBy || "admin";
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
