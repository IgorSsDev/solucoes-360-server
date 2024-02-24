import { Schema, model } from "mongoose";

export interface Iavaliable extends Document {
  company: [history: [], range: [], pergunta: string];
  nameWork: string;
  email: string,
  codeWork: string,
  dataNotClient: [history: [], range: [], pergunta: string],
  isClient: Number,
  Notclient: Number,
  satisfied: [],
  colections: [],
  workLogo: string
}

export const NewSchema = new Schema<Iavaliable>({
  company: { type: [] },
  email: { type: String },
  nameWork: { type: String },
  codeWork: { type: String },
  satisfied: { type: [] },
  workLogo: { type: String },
  dataNotClient: { type: [] },
  isClient: { type: Number },
  Notclient: { type: Number },
  colections: {type: []}
});

export const Model = model<Iavaliable>("chart", NewSchema);
