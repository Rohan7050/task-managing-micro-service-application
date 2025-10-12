import mongoose from "mongoose";

// an interface that describes the props required to create a new List
interface ListAttrs {
  name: string;
  desc: string;
  order: number;
  board: mongoose.Types.ObjectId;
}

// an interface that describes the properties that list model has
interface ListModel extends mongoose.Model<ListDoc> {
  build(attrs: ListAttrs): ListDoc;
}

// an interface that describes the properties that list document has
interface ListDoc extends mongoose.Document {
  name: string;
  desc: string;
  order: number;
  board: mongoose.Types.ObjectId;
  id: mongoose.Types.ObjectId;
}

// List schema
const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    order: {
      type: Number,
      require: true,
      default: 0
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true,
    }
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

// define build method
listSchema.statics.build = (attrs: ListAttrs) => {
  return new List(attrs);
};

// create List model
const List = mongoose.model<ListDoc, ListModel>("List", listSchema);

// export model
export { List };
