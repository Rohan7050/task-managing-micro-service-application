import mongoose from "mongoose";

// an interface that describes the props required to create a new Board
interface BoardAttrs {
  name: string;
  desc: string;
}

// an interface that describes the properties that board model has
interface BoardModel extends mongoose.Model<BoardDoc> {
  build(attrs: BoardAttrs): BoardDoc;
}

// an interface that describes the properties that board document has
interface BoardDoc extends mongoose.Document {
  name: string;
  desc: string;
  id: mongoose.Types.ObjectId;
}

// Board schema
const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
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
boardSchema.statics.build = (attrs: BoardAttrs) => {
  return new Board(attrs);
};

// create Board model
const Board = mongoose.model<BoardDoc, BoardModel>("Board", boardSchema);

// export model
export { Board };