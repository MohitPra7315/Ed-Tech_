

import axios from 'axios'

export const axiosInstance = axios.create({})

export const apiConnector = (method, url, bodyData, headers, params) => {

    console.log("url :", url, "BodyData :", bodyData, "headers : ", headers, "params :", params)

    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });

};