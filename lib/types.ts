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