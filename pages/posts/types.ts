export type Post = {
    title: string;
    content: string;
    published: boolean;
    slug: string;
    date: string;
}

export type Feed = {
    feed: Post[];
}