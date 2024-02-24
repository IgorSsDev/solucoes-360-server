import { Model } from "../../../models/app-totem/avaliable";

export const CalcVariations = async (id:any) => {
  try {
    const data = await Model.findOne({ codeWork: `${id}` });

    const valuesTotal: any = data?.satisfied.map(
      (questions: any) => questions.notas
    );

    const valor1 = valuesTotal[0];
    const valor2 = valuesTotal[1];
    const valor3 = valuesTotal[2];

    const total = valor1 + valor2 + valor3;

    const calc1 = ((valor1 * 100) / total).toFixed(2); 
    const calc2 = ((valor2 * 100) / total).toFixed(2); 
    const calc3 = ((valor3 * 100) / total).toFixed(2); 

    return [
      {
        pergunta: "Excelente",
        calc: `${calc1}%`,
      },
      {
        pergunta: "Satisfeito",
        calc: `${calc2}%`,
      },
      {
        pergunta: "Insatisfeito",
        calc: `${calc3}%`,
      },
    ];
  } catch (error) {
    console.log(error)
  }
};
