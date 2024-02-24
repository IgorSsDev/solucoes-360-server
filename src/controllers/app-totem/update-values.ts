import { Request, Response } from "express";
import { Model } from "../../models/app-totem/avaliable";
import { Dashboard } from "../dashboard/Dashboard";

export async function UpdateValues(req: Request, res: Response) {
  try {
    const { range, pergunta, codeWork, typeClient } = req.body;

    const meses = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];

    const hoje = new Date();
    const dia = hoje.getDate().toString();
    const mes = meses[hoje.getMonth()];

    const item: any = await Model.findOne({ codeWork: codeWork });
    const getFile = item?.company.findIndex(
      (index: any) => index.pergunta == pergunta
    );

    const formatDate = `${dia} ${mes}`;

    if (!item) {
      return res.status(401).json({ msg: "código de empresa inválida" });
    }
    if (getFile < 0) {
      return res.status(401).json({ msg: "código de empresa inválida" });
}
  const update = await Model.updateOne(
    { codeWork: codeWork, "company.pergunta": pergunta },
    {
      $push: {
        [`${typeClient}.${getFile}.history`]: formatDate,
        [`${typeClient}.${getFile}.range`]: range,
      },
    }
  );

    if (update.modifiedCount == 1) {
      res.json({ msg: "Obrigado pelo seu feedback" });
      return  Dashboard(req, res); 
    } else {
      res.json({ msg: "Dados incorretos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
}
