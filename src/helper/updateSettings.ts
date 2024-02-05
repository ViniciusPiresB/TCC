import axios from "axios";

export const updateSettings = async (responseTime: number) => {
  const actualSettingsRequest = await axios.get(
    "http://localhost:3000/settings"
  );

  const actualSettings = await actualSettingsRequest.data;
  console.log(actualSettings);
  const nIteracoes = Number(actualSettings.nIteractions) + 1;
  const canAnswerGroup = actualSettings.canAnswerGroup;

  const newSettings = {
    nIteractions: nIteracoes,
    tempoResposta: `${responseTime}s`,
    canAnswerGroup
  };

  console.log(newSettings);

  const updateSettingsRequest = await axios.post(
    "http://localhost:3000/settings",
    newSettings
  );

  if (updateSettingsRequest.status != 200)
    throw new Error("Error on update settings request");
};
