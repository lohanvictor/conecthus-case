import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useCustomSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParams(customParams: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(customParams).forEach(([key, value]) => {
      params.set(key, value);
    });
    router.push(`${pathname}?${params.toString()}`);
  }

  function updatePage(page: string | number) {
    updateParams({ page: page.toString() });
  }

  function updateSearch(search: string) {
    updateParams({ search });
  }

  return {
    updateParams,
    updatePage,
    updateSearch,
  };
}
