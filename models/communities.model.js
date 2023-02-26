const { mongoose } = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
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

module.exports = Communities = mongoose.model("Community", communitySchema);
