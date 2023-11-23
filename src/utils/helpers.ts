export interface QueryParameters {
  [key: string]: string | number | boolean | undefined
}

export const objectToQueryString = (queryParameters: QueryParameters): string => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val]) => {
        const symbol = queryString.length === 0 ? '?' : '&'
        queryString += val ? `${symbol}${key}=${val}` : ''
        return queryString
      }, '')
    : ''
}
