import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    profilePic: {
      type: String,
      default: "/default.jpg",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    authProvider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    googleId: {
      type: String,
      default: null,
    },
   bio:{
    type:String,
    default:"hy i am new user"
   },
   role:{
    type:String,
    default:"user"
   },
   phone:{
    type:String,
    default:"+92XXXXXXXXX"
   }
   

  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;