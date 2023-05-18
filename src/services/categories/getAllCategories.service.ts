import { Repository } from 'typeorm';
import { TCategory } from '../../interfaces/categories.interfaces';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';

const getAllCategoriesService = async (): Promise<TCategory[]> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: TCategory[] = await categoryRepository.find();

  return categories;
};

export default getAllCategoriesService;
