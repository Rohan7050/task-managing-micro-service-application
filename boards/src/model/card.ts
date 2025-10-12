import mongoose from "mongoose";

// an interface that describes the props required to create a new Card
interface CardAttrs {
  title: string;
  desc?: string;
  order?: number;
  cover_color?: string;
  start_date?: Date;
  end_date?: Date;
  assign_to: string;
  list: mongoose.Types.ObjectId;
  board: mongoose.Types.ObjectId;
}

// an interface that describes the properties that Card model has
interface CardModel extends mongoose.Model<CardDoc> {
  build(attrs: CardAttrs): CardDoc;
}

// an interface that describes the properties that card document has
export interface CardDoc extends mongoose.Document {
  title: string;
  order?: number;
  desc?: string;
  cover_color?: string;
  start_date?: Date;
  end_date?: Date;
  assign_to: string;
  id: string;
  list: mongoose.Types.ObjectId;
  board: mongoose.Types.ObjectId;
}

// Card schema
const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0
    },
    desc: {
      type: String,
    },
    cover_color: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    assign_to: {
      type: String,
      required: true,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
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
cardSchema.statics.build = (attrs: CardAttrs) => {
  return new Card(attrs);
};

// create Card model
const Card = mongoose.model<CardDoc, CardModel>("Card", cardSchema);

// export model
export { Card };
