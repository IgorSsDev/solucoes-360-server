import {Request, Response} from "express"
import { Model } from "../../models/app-totem/avaliable"

export async function GetValues(req:Request, res:Response){

     const {codeWork} = req.body;
     const valueItems = await Model.findOne({codeWork: codeWork})

     
     if(!valueItems){
        return res.status(401).json({msg: "Empresa não encontrada"})
     }

    return res.status(200).json(valueItems)
    
}