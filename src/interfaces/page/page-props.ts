interface PageProps {
  params:
    | {
        id: string;
        slug: string;
      }
    | Promise<{ id: string; slug: string }>;
  searchParams:
    | {
        page?: string;
      }
    | Promise<{ [key: string]: string | string[] | undefined; page?: string }>;
}

export type { PageProps };
