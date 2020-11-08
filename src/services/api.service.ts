import http, {AxiosRequestConfig, Method} from "axios";

const ApiService = {
  request (resource:Method, url: string,  config?:AxiosRequestConfig): Promise<any> {
    config = {
      method: resource,
      url: url,
      baseURL: process.env.UNIVERSE_SERVICE_ENDPOINT,
      ...config
    }

    return http.request(config)
      .catch((error) => {
        throw new Error(`ApiService ${error}`)
      })
  },
};

export default ApiService;


// FIXME: Break these out.
export const GalaxiesService = {
  all () {
    return ApiService.request('get', '/galaxies');
  },
};
