import { Request, Response } from "express";
import { Model } from "../../models/app-totem/avaliable";
import { Dashboard } from "../dashboard/Dashboard";

export async function UpdateSatisfied(req: Request, res: Response) {
  const { pergunta, codeWork } = req.body;

  const data: any = await Model.findOne({ codeWork: codeWork });

  const positionQuestion: any = data?.satisfied.findIndex(
    (question: any) => question.pergunta == pergunta
  );
  if(data == null){
    return res.status(200).json({ msg: "codígo da empresa inválida" });

  }
  if (positionQuestion < 0) {
    return res.status(200).json({ msg: "Dados incorretos" });
  }
  const valueQuestion = data?.satisfied[positionQuestion].notas;

  const updateValues = await Model.updateOne(
    { codeWork: codeWork },
    {
      $set: {
        [`satisfied.${positionQuestion}.notas`]: valueQuestion + 1,
      },
    }
  );
  if (updateValues.modifiedCount == 1) {
    res.status(200).json({ msg: "Obrigado pelo seu Feedback" });
    return Dashboard(req, res); 
  }
  return res.status(200).json({ msg: "Estamos aguardando o servidor" });
}
