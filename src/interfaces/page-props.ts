interface PageProps {
  params: Promise<{ id: string; slug: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
    page?: string;
  }>;
}

export type { PageProps };
