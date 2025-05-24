import { Schema, model } from "mongoose";

const restrictionSchema = new Schema(
  {
    child_email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Please Enter a valid email address",
      ],
    },
    blocked_courses: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const Restriction = model("Restriction", restrictionSchema);

export default Restriction;
