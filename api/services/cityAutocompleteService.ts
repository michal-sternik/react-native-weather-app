
import { citiesApi } from '..';
import { CITYAPI_API_KEY } from '../../api-tokens';
import { PredictedPlace } from '../../types/cityTypes';


class CityAutocompleteService {

    public static async getListOfPredictetCities(prompt: string): Promise<PredictedPlace[]> {
        const citiesData = (await citiesApi.get(`autocomplete?text=${prompt}&limit=3&type=city&format=json&apiKey=${CITYAPI_API_KEY}`)).data

        if (citiesData.results && citiesData.results.length > 0) {
            const formattedData: PredictedPlace[] = [];

            for (let i = 0; i < citiesData.results.length; i++) {
                const result = citiesData.results[i];
                formattedData.push({
                    city: result.city,
                    country: result.country
                });
            }

            return formattedData;
        } else {
            return [];
        }
    }

}
export default CityAutocompleteService;
