import axios from "axios";

export const getSettings = async () => {
  const request = await axios.get("http://localhost:3000/settings");

  const data = await request.data;

  return data;
};
