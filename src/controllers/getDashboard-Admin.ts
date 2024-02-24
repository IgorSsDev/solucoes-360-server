import { Request, Response } from "express";
import { AdminModel } from "../models/dashboard-admin";

export default async function GetClients(req: Request, res: Response) {

  const data = await AdminModel.find();

  if (!data) {
    return res.status(401).json({ msg: "Banco de dados inexistente" })
  }
  return res.status(200).json(data)
  
}