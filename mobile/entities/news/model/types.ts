export type NewsType = {
    id: number;
    link: string;
    image: string;
    tag: string;
    date: string;
    title: string;
    description: string;
};

export type NewsParamsType = {
    page: number;
    limit: number;
};
