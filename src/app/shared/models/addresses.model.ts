export namespace AddressModel {

    export interface Address {
        id: string;
        title: string;
        street: string;
        building: string;
        appartmentOrOfficeNumber?: any;
        cityId: string;
        countryCode: string;
        city: City;
        country: Country;
    }

    export interface Country {
        code: string;
        name: string;
        cities: City[];
    }

    export interface City {
        id: string;
        name: string;
        countryCode: string;
    }
}
