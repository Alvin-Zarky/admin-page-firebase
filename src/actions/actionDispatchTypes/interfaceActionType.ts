import { GetCategory } from "../../constants/interfaceConstant";

interface GetCategoryRequest{
  type: GetCategory.GET_CATEGORY_REQUEST,
}

interface GetCategorySuccess{
  type: GetCategory.GET_CATEGORY_SUCCESS,
  payload: any[]
}

interface GetCategoryFail{
  type: GetCategory.GET_CATEGORY_FAIL,
  payload: any | string
}

export type GetCategoryActionTypes= GetCategoryRequest | GetCategorySuccess | GetCategoryFail
