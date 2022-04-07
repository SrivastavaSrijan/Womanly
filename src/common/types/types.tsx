export interface IList {
    label: string;
    id: string;
}

export interface IWikipedia {
    batchcomplete: boolean;
    query: {
        normalized?:
        {
            fromencoded: boolean,
            from: string,
            to: string
        }[],
        redirects?:
            {
                from: string,
                to: string
        }[],
        pages: {
            pageid: number,
            ns: number,
            title: string;
            extract: string;
        }[]
    }
}
