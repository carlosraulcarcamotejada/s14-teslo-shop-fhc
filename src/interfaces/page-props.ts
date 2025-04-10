interface PageProps {
  params: {
    id: string;
    slug: string;
  };
  searchParams?: {
    page?: string;
    [key: string]: string | string[] | undefined;
  };
}

type Params = { slug: string };
type SearchParams = { [key: string]: string | string[] | undefined };

export type { PageProps };
export type { Params };
export type { SearchParams };
