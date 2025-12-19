import { apiService } from "../../api/apiServices"

export const loginApi = async (data: object) => {
    const payload = {...data}
    const response = await apiService.post({
        url: `user/login`,
        payload
    })
    return response
}
export const forgotPasswordApi = async (data: object) => {
    const payload = {...data}
    const response = await apiService.post({
        url: `user/forgotPassword`,
        payload
    })
    return response
}
export const validateOtpApi = async (data: object) => {
    const payload = {...data}
    const response = await apiService.post({
        url: `user/validateOtp`,
        payload
    })
    return response
}
export const resetPasswordpApi = async (data: object) => {
    const payload = {...data}
    const response = await apiService.post({
        url: `/user/resetPassword`,
        payload
    })
    return response
}

export const getProfileApi = async () => {
    const response = await apiService.get(`/user/get`);
    return response
}