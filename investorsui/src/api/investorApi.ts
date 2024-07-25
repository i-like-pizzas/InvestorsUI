import axios, { AxiosError, AxiosResponse } from "axios";
import { validationError } from "./types";

const baseUrl = import.meta.env.VITE_API_URL;


const getInstance = () =>
	axios.create({
		baseURL: baseUrl,
		headers: {
			"Content-type": "application/json",
		}
	});

export class apiResponse<T> {
	statusCode?: number
	data?: T
	message?: string | undefined | null
	public isSuccess = (): boolean => this.statusCode == 200
}

function fixUrl(relativeUrl: string): string {
	let url = relativeUrl;

	if (!url.startsWith("/")) url = "/" + url;

	return url;
}

function createResponse<T>(axiosResponse: AxiosResponse<T>): apiResponse<T> {
	const result = new apiResponse<T>();

	if (axiosResponse.status == 422) {
		const validationErrors = (axiosResponse.data as validationError)?.detail?.map(x => x.msg);

		result.data = axiosResponse.data;
		result.statusCode = axiosResponse.status;
		result.message = validationErrors ? validationErrors.join(', ') : axiosResponse.data as unknown as string;
	}
	else if (axiosResponse.status >= 400) {
		result.data = axiosResponse.data;
		result.statusCode = axiosResponse.status;
		result.message = axiosResponse.data as unknown as string;
	} else {
		result.data = axiosResponse.data;
		result.statusCode = axiosResponse.status;
	}

	return result;
}

export async function get<T = unknown>(relativeUrl: string): Promise<apiResponse<T>> {
	const instance = getInstance()

	try {
		const url = fixUrl(relativeUrl);

		const response = await instance.get<T>(url, {
			validateStatus: function (status) {
				return status != 401 && status < 500;
			}
		})

		return createResponse(response);
	} catch (error) {
		return await handleErrorResponse(error);
	}
}

async function handleErrorResponse<T>(error: unknown): Promise<apiResponse<T>> {
	const response = new apiResponse<T>();

	response.message = "Error";

	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError;

		if (axiosError.response) {
			response.statusCode = axiosError.status;
		}
	} else {
		response.statusCode = 500;
	}

	return response;
}
