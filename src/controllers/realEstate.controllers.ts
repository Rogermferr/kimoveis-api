import { Request, Response } from 'express';
import {
  TRealEstate,
  TRealEstateRequest,
  TRealEstateResponse,
} from '../interfaces/realEstate.interfaces';
import createRealEstateService from '../services/realEstate/createRealEstate.service';
import getAllRealEstateService from '../services/realEstate/getAllRealEstate.service';
import { RealEstate } from '../entities';

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: TRealEstateRequest = req.body;

  const realEstate: TRealEstateResponse = await createRealEstateService(
    realEstateData
  );

  return res.status(201).json(realEstate);
};

const getAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstates: RealEstate[] = await getAllRealEstateService();

  return res.json(realEstates);
};

export { createRealEstateController, getAllRealEstateController };
