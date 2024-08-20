'use client'

import { Typeracer } from "@/components/Typeracer";
import { IQuotes, IQuotesData } from "@/interfaces/workout/instructions/ITyperacer";

export function ContainerTyperace({ quotes }: { quotes: IQuotes[] }) {
    return (
        <Typeracer 
            quotesData={quotes}
        />
    )

}