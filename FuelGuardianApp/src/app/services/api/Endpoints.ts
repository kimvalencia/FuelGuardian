export const API_ENDPOINTS = {
    FuelUsages:{
        GET_ALL: 'api/FuelUsages',
        CREATE: 'api/FuelUsages',
        UPDATE: (id: number) => `api/FuelUsages/${id}`,
    }
}