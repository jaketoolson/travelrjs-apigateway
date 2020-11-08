
import {GalaxiesService} from "../services/api.service";

export const index = async (request: any, h: any) => {
  const data = await GalaxiesService.all();
  return await data.data;
};

export const show = (request: any, h: any) => {
  return {};
};

