import axios, { AxiosError, AxiosResponse } from "axios";
import { ValidationError } from "./types";

const baseUrl = import.meta.env.VITE_API_URL;

const getInstance = () =>
	axios.create({
		baseURL: baseUrl,
		headers: {
			"Content-type": "application/json",
		}
	});

export class ApiResponse<T> {
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

function createResponse<T>(axiosResponse: AxiosResponse<T>): ApiResponse<T> {
	const result = new ApiResponse<T>();

	if (axiosResponse.status == 422) {
		const validationErrors = (axiosResponse.data as ValidationError)?.detail?.map(x => x.msg);

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

export async function get<T = unknown>(relativeUrl: string): Promise<ApiResponse<T>> {
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

async function handleErrorResponse<T>(error: unknown): Promise<ApiResponse<T>> {
	const response = new ApiResponse<T>();

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
