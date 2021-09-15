import { databaseQuery } from "../config/database";
import { RESPONSE_CODES } from "../constants/responseCodes";
import transformRows from "../utils/transformRows";

const duplicateCheck = async (name: string, query: string): Promise<number> => {
  let responseCode: number;
  try {
    const { rows } = await databaseQuery(query);
    if (transformRows(rows).includes(name))
      return RESPONSE_CODES.DUPLICATE_ENTITY;
    responseCode = RESPONSE_CODES.ADD_SUCCESS;
  } catch (error: any) {
    responseCode = RESPONSE_CODES.ADD_ERROR;
  }
  return responseCode;
};

export default duplicateCheck;
