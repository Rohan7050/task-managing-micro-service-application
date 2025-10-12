import mongoose from "mongoose";

// Allowed access types
type AccessType = "read" | "write" | "admin";

// Interface for attributes to create a record
interface UserBoardAccessAttrs {
  user: string; // Reference to User
  board: mongoose.Types.ObjectId; // Reference to Board
  accessType: AccessType;
}

// Interface for document
interface UserBoardAccessDoc extends mongoose.Document {
  user: string;
  board: mongoose.Types.ObjectId;
  accessType: AccessType;
  id: string;
}

// Interface for model
interface UserBoardAccessModel extends mongoose.Model<UserBoardAccessDoc> {
  build(attrs: UserBoardAccessAttrs): UserBoardAccessDoc;
}

// Schema definition
const userBoardAccessSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    accessType: {
      type: String,
      enum: ["read", "write", "admin"],
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// Static build method
userBoardAccessSchema.statics.build = (attrs: UserBoardAccessAttrs) => {
  return new UserBoardAccess(attrs);
};

// Model creation
const UserBoardAccess = mongoose.model<
  UserBoardAccessDoc,
  UserBoardAccessModel
>("UserBoardAccess", userBoardAccessSchema);

export { UserBoardAccess };
