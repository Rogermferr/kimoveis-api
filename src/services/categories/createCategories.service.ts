import { Repository } from 'typeorm';
import { Category } from '../../entities';
import { TCategoryRequest } from '../../interfaces/categories.interfaces';
import { AppDataSource } from '../../data-source';
import { categorySchema } from '../../schemas/categories.schemas';
import { AppError } from '../../error';

const createCategoriesService = async (
  categoryData: TCategoryRequest
): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepository.findOneBy({
    name: categoryData.name,
  });

  if (category) {
    throw new AppError('Category already exists', 409);
  }

  const newCategory: Category = categoryRepository.create(categoryData);
  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoriesService;
