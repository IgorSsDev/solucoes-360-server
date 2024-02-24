import { AdminModel } from "../models/dashboard-admin";

export async function createPainel({nameWork, value, type_Payment, status, email, code}: any) {

  const createCredentials = new AdminModel({
    work:nameWork, value, type_Payment, status, email, code
  })

  const pushCrentials = await AdminModel.create(createCredentials)
  
}