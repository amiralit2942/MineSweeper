import { CONFIG } from "../config";
import { APIHelper } from "./http_wrapper";
import { WSWrapper } from "./ws_wrapper";
export const API = new APIHelper({
    baseUrl: CONFIG.API_BASE_URL,
    apiToken: CONFIG.API_TOKEN,
})