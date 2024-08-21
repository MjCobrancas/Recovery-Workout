'use client'

import { Typeracer } from "@/components/Typeracer";
import { IQuotes } from "@/interfaces/workout/instructions/ITyperacer";

export function ContainerTyperacer({ quotes }: { quotes: IQuotes[] }) {
    return (
        <Typeracer 
            quotesData={quotes}
        />
    )

}