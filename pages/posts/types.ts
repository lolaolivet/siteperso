export type Post = {
    id: number;
    title: string;
    content: string;
    published: boolean;
    slug: string;
    date?: string;
}

export type Feed = {
    feed: Post[];
}

export type Posts = {
    posts: Post[];
}