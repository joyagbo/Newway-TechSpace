const { mongoose } = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    days: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: false,
      validate: {
        validator: function (v) {
          return /^(active|inactive)$/.test(v);
        },
      },
    },
    added_on: {
      type: Date,
      default: Date.now,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Goals = mongoose.model("Goal", goalSchema);
