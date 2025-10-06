import mongoose from "mongoose";

// an interface that describes the props required to create a new User
interface UserAttrs {
  email: string;
  id: string;
}

// an interface that describes the properties that user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties that user document has
interface UserDoc extends mongoose.Document {
  email: string;
  id: string;
}

// User schema
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

// define build method
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    email: attrs.email,
  });
};

// create User model
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// export model
export { User };
