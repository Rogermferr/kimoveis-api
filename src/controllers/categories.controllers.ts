import { Request, Response } from 'express';
import {
  TCategory,
  TCategoryRequest,
} from '../interfaces/categories.interfaces';
import createCategoriesService from '../services/categories/createCategories.service';
import getAllCategoriesService from '../services/categories/getAllCategories.service';
import { Category } from '../entities';
import getAllPropertiesByCategoryService from '../services/categories/getAllPropertiesByCategory.service';

const createCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryRequest = req.body;

  const category: TCategory = await createCategoriesService(categoryData);

  return res.status(201).json(category);
};

const getAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories: TCategory[] = await getAllCategoriesService();

  return res.json(categories);
};

const getAllPropertiesByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = Number(req.params.id);

  const category: Category = await getAllPropertiesByCategoryService(
    categoryId
  );

  return res.json(category);
};

export {
  createCategoriesController,
  getAllCategoriesController,
  getAllPropertiesByCategoryController,
};
