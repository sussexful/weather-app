import { atom } from "recoil";
import { ApiResponseType } from "./api_response";

export const error = atom<string>({
    key: "error",
    default: ""
})

export const inputLocation = atom<string>({
    key: "inputLocaion",
    default: "London"
})

export const weatherInfo = atom<ApiResponseType | null>({
    key: "weatherInfo",
    default: null
})