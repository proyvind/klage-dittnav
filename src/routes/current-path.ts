interface Location {
    pathname: string;
    search: string;
    hash: string;
}

export const currentPath = ({ pathname, search, hash }: Location) => pathname + search + hash;
