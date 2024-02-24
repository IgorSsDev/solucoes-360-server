import { Request, Response } from "express";
import { Model } from "../../models/app-totem/avaliable";
import { CalcVariations } from "./utils/calcVariationsEmogis";
import { io } from "../../server";
import { format, subMonths, endOfMonth }  from "date-fns"
export async function Dashboard(req: Request, res: Response) {
  try {
    const { id }: any = req.params;
    const data: any = await Model.findOne({ codeWork: `${id}` });
    if(!data){
      return res.status(401).json({msg: "Está empresa não existe."})
    }
    const totalElementos = data?.company?.reduce((acc: number, pergunta: any) => {
      return acc + pergunta.range?.length;
    }, 0);

    const somaRange = data?.company?.reduce((acc: number, pergunta: any) => {
      return acc + pergunta.range.reduce((perguntaAcc: number, rangeItem: number) => {
        return perguntaAcc + rangeItem;
      }, 0);
    }, 0);

    const totalElementosNotClients = data?.dataNotClient?.reduce((acc: number, pergunta: any) => {
      return acc + pergunta?.range?.length;
    }, 0);
    
    const somaRangeNotClient = data?.dataNotClient?.reduce((acc: number, pergunta: any) => {
      return acc + pergunta?.range?.reduce((perguntaAcc: number, rangeItem: number) => {
        return perguntaAcc + rangeItem;
      }, 0);
    }, 0);

    const Media = somaRange?.toFixed(2) / totalElementos;
    const MediaNotClient = somaRangeNotClient?.toFixed(2) / totalElementosNotClients;
    

    

    if (data == null || somaRange == null || totalElementos == null || totalElementosNotClients == null ||
      somaRangeNotClient == null) {
      return;
    }

    const porcentagensEmogis = await CalcVariations(id);

    
    const currentDate = new Date();
    const lastDayOfLastMonth = endOfMonth(subMonths(currentDate, 1));
    const formattedDate = format(lastDayOfLastMonth, "dd MMM");

    // const receivedDate = await Model.findOne({ codeWork: `${id}`, 'history.0': { $gte: lastDayOfLastMonth } });
    // acima está a criação do evento de captura da data retrasada, para ajustes de relatorios
      // der um console.log e verifique a saída e crie um calculo matematico para 
        // resolução da demanda
    io.to(`dashboard-${id}`).emit("dashboard", {
      dataClient: data,
      notclient: {
        total: totalElementosNotClients,
        media:parseFloat(MediaNotClient?.toFixed(2)) ,
        some: somaRangeNotClient
        },
      emogis: porcentagensEmogis,
      numberPeople: totalElementos,
      Media: parseFloat(Media?.toFixed(2)),
      somaTotal: somaRange,
    });

    res
      .status(200)
      .json({
        dataClient: data,
        notclient: {
          total: totalElementosNotClients,
          media:parseFloat(MediaNotClient?.toFixed(2)) ,
          some: somaRangeNotClient
          },
        emogis: porcentagensEmogis,
        numberPeople: totalElementos,
        Media: parseFloat(Media?.toFixed(2)),
        somaTotal: somaRange,
      });
  } catch (error) {
    console.error(error);
  }
}