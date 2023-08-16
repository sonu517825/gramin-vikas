const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    my_sponcer_id: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      unique: true,
    },
    refer_sponcer_id: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    parent_refer_sponcer_id: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      enum: ["LEFT", "RIGHT"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    father_name: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      uppercase: true,
      enum: ["MALE", "FEMALE", "OTHER"],
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    date_of_birth: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    // profile_url: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", Schema);
