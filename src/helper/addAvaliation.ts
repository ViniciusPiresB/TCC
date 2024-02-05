import { AvDTO } from "../dto/av.dto";
import { NumberAvDTO } from "../dto/numberAv.dto";

export const addAssessment = (valAv: number, avs: AvDTO[]) => {
  if (avs.length == 0) {
    const av: AvDTO = {
      av1: valAv,
      av2: -1
    };

    avs.push(av);

    return avs;
  }

  const lastItemIndex = avs.length - 1;

  const lastAv = avs[lastItemIndex];

  if (lastAv.av2 == -1) {
    lastAv.av2 = valAv;

    return avs;
  }

  const av: AvDTO = { av1: valAv, av2: -1 };

  avs.push(av);

  return avs;
};
