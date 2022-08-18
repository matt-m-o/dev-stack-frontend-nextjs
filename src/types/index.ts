export interface IUserPersonalInfo {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface IDevelopmentType {
    id: string;
    name: string;
}

export interface IProgrammingLanguage {
    id: string;
    name: string;
    full_name: string;
}

export interface IStack {
    id: string;
    id_user: string;
    id_development_type: string;
    development_type: IDevelopmentType;
    programming_languages: IProgrammingLanguage[];
}