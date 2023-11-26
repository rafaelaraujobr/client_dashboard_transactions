import type { AxiosInstance, AxiosResponse } from 'axios'
import http from '@/plugins/http'
import { objectToQueryString, type QueryParameters } from '@/utils/helpers'

export const getTransactionsService = async (query: QueryParameters): Promise<AxiosResponse> => {
  return await http.get<AxiosInstance>(`transactions${objectToQueryString(query)}`)
}

export const getTransactionByIdService = async (id: number): Promise<AxiosResponse> => {
  return await http.get<AxiosInstance>(`transactions/${id}`)
}

export const getWidgetByTypeService = async (type: string, query: QueryParameters = {}): Promise<AxiosResponse> => {
  return await http.get<AxiosInstance>(`widgets/${type}/dashboard${objectToQueryString(query)}`)
}
