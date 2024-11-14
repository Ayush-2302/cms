import mongoose from "mongoose";
const carSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    tags: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, default: "admin" },
    modifiedBy: { type: String, default: "admin" },
  },
  {
    timestamps: true,
  }
);

carSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.modifiedBy = this.modifiedBy || "admin";
  }
  next();
});

export default mongoose.models.Car || mongoose.model("Car", carSchema);
