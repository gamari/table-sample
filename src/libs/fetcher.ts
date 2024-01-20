export const fetcher = async (url: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
    const json = await res.json();
    return json;
}
