import { Schema, model } from "mongoose";

export interface IDashboardAdmin extends Document {
  work: string,
  status: boolean,
  type_Payment: string,
  value: number,
  email: string,
  code: string
}

export const NewSchema = new Schema<IDashboardAdmin>({
  work: {type: String},
  status: {type: Boolean},
  type_Payment: {type: String},
  value: {type: Number},
  email: {type: String},
  code: {type: String}

});

export const AdminModel = model<IDashboardAdmin>("dashboard-admin", NewSchema);
