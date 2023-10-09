
const config = {
    baseUrlBackend: import.meta.env.VITE_OUT_LOCALHOST == "true" ? "http://asdf:3001":import.meta.env.VITE_BASE_URL_BACKEND,
    appSecretBackend: import.meta.env.VITE_APP_SECRET_BACKEND,
    countryCode: import.meta.env.VITE_CODE_COUNTRY,
    countryCodeAndDDD:import.meta.env.VITE_CODE_COUNTRY_AND_DDD,
}

export default config;
