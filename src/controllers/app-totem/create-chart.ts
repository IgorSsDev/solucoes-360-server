import { Request, Response } from "express";
import { Model } from "../../models/app-totem/avaliable";
import { createPainel } from "../puhs-Dashboard-Admin";

export async function CreateChart(req: Request, res: Response) {

  const { nameWork, workLogo, codeWork, email, status, type_Payment, value } = req.body;

  const newmodel = new Model({
    company: [
      {
        pergunta: "Qual nota você classificaria, para a higienização do ambiente?",
        history: [],
        range: [],
      },
      {
        pergunta: "Qual nota você classificaria, para os professores?",
        history: [],
        range: [],
      },
      {
        pergunta: "Qual nota você classificaria, para o Atendimento?",
        history: [],
        range: [],
      },
      {
        pergunta: "Qual nota você classificaria, para a nossa localização?",
        history: [],
        range: [],
      },
      {
        pergunta: "Qual nota você classificaria, para os nossos Equipamentos?",
        history: [],
        range: [],
      },
    ],
    satisfied: [
      {
        pergunta: "Excelente",
        notas: 0,
      },
      {
        pergunta: "Satisfeito",
        notas: 0,
      },
      {
        pergunta: "Insatisfeito",
        notas: 0,
      }
    ],
    dataNotClient: [{
      pergunta: "Qual nota você classificaria, para a higienização do ambiente?",
      history: [],
      range: [],
    },
    {
      pergunta: "Qual nota você classificaria, para os professores?",
      history: [],
      range: [],
    },
    {
      pergunta: "Qual nota você classificaria, para o Atendimento?",
      history: [],
      range: [],
    },
    {
      pergunta: "Qual nota você classificaria, para a nossa localização?",
      history: [],
      range: [],
    },
    {
      pergunta: "Qual nota você classificaria, para os nossos Equipamentos?",
      history: [],
      range: [],
    },],
    nameWork: nameWork,
    codeWork: codeWork,
    isClient: 0,
    Notclient: 0,
    workLogo: workLogo,
    email: email,
  });
  if (nameWork == "" || codeWork == "" || workLogo == "" || email == "" || status == null || type_Payment == "" || value == null) {
    return res.status(401).json({ msg: "Houve falta de dados, para serem colocados. Porfavor, verifique-os e tente novamente" })
  }
  const workExist = await Model.findOne({ codeWork: codeWork });
  if (workExist) {
    return res
      .status(200)
      .json({ msg: "Esta empresa ja possui, um Banco de Dados" });
  }

  
  const createChart = await Model.create(newmodel);



  if (createChart) {
    try {
      await createPainel({ nameWork, email, value, type_Payment, status, codeWork });
      return res.status(200).json({ msg: "Item Salvo com sucesso" })

    } catch (error) {
      return res.status(401).json({ msg: "Error ao salvar no dashboard_admin", error: error })
    }
  }

  res.status(401).json({
    msg: "Ops, algo falhou na requisição",
  });
}
