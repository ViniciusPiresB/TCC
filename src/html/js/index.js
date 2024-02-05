const saveButton = document.getElementById("save");
const groupChatBot = document.getElementById("group-chatbot");
const apiURL = "http://localhost:3000";

const checkStatus = async () => {
  const statusDisplay = document.getElementsByClassName("status online");
  const statusDisplayElement = statusDisplay[0];

  try {
    const request = await fetch(`${apiURL}/prompt`);

    if (!request.status == 200) {
      throw new Error("Error on api request");
    }

    statusDisplayElement.style.color = "green";
  } catch (err) {
    statusDisplayElement.style.color = "red";
  }
};

const updateStatus = async () => {
  const groupCheckBox = document.getElementById("group-chatbot");
  const responseTimeElement = document.getElementById("response-time");
  const iterationRate = document.getElementById("interaction-rate");

  const request = await fetch(`${apiURL}/settings`);

  if (request.status != 200) throw new Error("Error on settings request");

  const response = await request.json();

  if (response.canAnswerGroup) groupCheckBox.checked = true;
  else groupCheckBox.checked = false;

  responseTimeElement.value = response.tempoResposta;
  iterationRate.value = response.nIteractions;
};

const saveSettings = async () => {
  const promptsElements = document.getElementsByClassName(
    "form-control form-control-vertical"
  );

  let prompt = "";

  for (let i = 0; i < promptsElements.length; i++) {
    const promptElement = promptsElements[i];

    prompt += promptElement.value + "\n\n";
  }

  console.log(prompt);

  const request = await fetch(`${apiURL}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: prompt })
  });

  if (request.status != 200) throw new Error("Error on setPrompt");
};

saveButton.onclick = async () => {
  await saveSettings();
};

groupChatBot.onclick = async () => {
  const getSettingsRequest = await fetch(`${apiURL}/settings`);

  const settings = await getSettingsRequest.json();

  const isChecked = groupChatBot.checked;
  console.log(isChecked);
  settings.canAnswerGroup = isChecked;

  const saveSettingsRequest = await fetch(`${apiURL}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings)
  });

  if (saveSettingsRequest.status != 200)
    throw new Error("Error on update group status");
};

(() => {
  checkStatus();
  updateStatus();
})();
