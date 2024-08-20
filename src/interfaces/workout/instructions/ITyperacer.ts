export type Quote = {
    quote: string;
    movieName: string;
};

interface IQuotes {
    Id_Phrase: number
    Phrase: string
    Phrase_Reference: string
    Status: boolean
    Id_Creditor: number
    Position: number 
}

interface IQuotesData {
    quotesData: IQuotes[]
}

export type { IQuotes, IQuotesData }

export const countQuote = (quotes: IQuotes[], count: number): IQuotes => quotes[count];

export const GameState = {
    PLAYING: "PLAYING",
    VIEW_STATS: "VIEW_STATS",
    WAITING: "WAITING",
};
