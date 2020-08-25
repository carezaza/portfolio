const mongoose = require("mongoose");

const PortSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  handlePath: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    minLength: 5,
  },
  avatar: {
    type: String,
    default: "",
  },
  background: {
    type: String,
    default: "",
  },
  resume: {
    type: String,
    default: "",
  },
  name: {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    nickName: {
      type: String,
      default: "",
    },
  },
  projects: {
    type: [
      {
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        previewImage: {
          type: String,
        },
        liveDemo: {
          type: String,
        },
        githup: {
          type: String,
        },
      },
    ],
    default: [],
  },
  contact: {
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
  },
  social: {
    githup: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
  },
  about: {
    type: String,
    default: "",
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ports", PortSchema);
