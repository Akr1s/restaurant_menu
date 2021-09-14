import { RESPONSE_CODES } from "../constants/responseCodes";
import {
  objectConfigurationTest,
  stringIsIncorrect,
} from "../helpers/validatorHelpers";
import { InfoInterface } from "../interfaces/info";

export const validateInfo = (body: InfoInterface): number => {
  const { title, tel, address, wifi } = body;
  const objectConfigurationTestResult = objectConfigurationTest<InfoInterface>(
    body,
    4,
    title,
    tel,
    address,
    wifi
  );
  if (objectConfigurationTestResult) return objectConfigurationTestResult;
  if (stringIsIncorrect(title, 25)) return RESPONSE_CODES.INFO_TITLE_ERROR;
  if (stringIsIncorrect(address, 50)) return RESPONSE_CODES.INFO_ADDRESS_ERROR;
  if (stringIsIncorrect(tel, 15)) return RESPONSE_CODES.INFO_TEL_ERROR;
  if (stringIsIncorrect(wifi, 15)) return RESPONSE_CODES.INFO_WIFI_ERROR;
  return RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
