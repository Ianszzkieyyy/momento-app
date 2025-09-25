export interface Entry {
    id: string;
    text: string;
    title: string;
    image_url: string;
    tags: {
        id: string;
        name: string;
    }[];
    created_at: string;
}

export interface Tag {
    id: string;
    name: string;
}