import { Request, Response } from "express";
import { AdminModel } from "../models/dashboard-admin";

export default async function UpdateDashborad(req:Request, res:Response){

  const { email, status } = req.body;

  const updateUser = await  AdminModel.updateOne({email: email}, {status: status})

  if(email == "" || status == null || !updateUser){
    return res.status(401).json({msg: 'Parâmetros incorretos.'})
  }

  return res.status(200).json({msg: "Usuário atualizado com sucesso"})

} 

