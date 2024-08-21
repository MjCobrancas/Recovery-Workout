import { IQuotes } from "@/interfaces/workout/instructions/ITyperacer";
import { FC } from "react";

interface StatsDisplayProps {
    quote: IQuotes;
    endTime: number;
    startTime: number;
    numOfWords: number;
    onClickNextQuote: () => void;
    cpw: number
}

const StatsDisplay: FC<StatsDisplayProps> = ({
    cpw,
    quote,
    startTime,
    endTime,
    numOfWords,
    onClickNextQuote,
}) => {
    const typeDurationInSeconds = (endTime - startTime) / 1000;
    const wps = numOfWords / typeDurationInSeconds;
    const wpm = Math.floor(wps * 60);
    const cpm = (cpw / typeDurationInSeconds ) * 60
    

    return (
        <div className="w-fit h-fit border rounded-xl p-4 my-2">
            <p className="text-xl font-bold font-sans">
                Você acabou de digitar uma frase sobre {quote.Phrase_Reference}
            </p>
            <p className="mt-2">Suas estatisticas</p>
            <ul>
                <li>Palavras Por Minuto: {wpm}</li>
                <li>Palavras Por Segundo: {wps.toFixed(2)}</li>
                <li>Caracteres Por Minuto: {cpm.toFixed(0)}</li>
            </ul>
            <button
                onClick={onClickNextQuote}
                id="nextQuote"
                className="px-4 py-2 border rounded-xl bg-blue-500 text-white mt-4 hover:bg-white-500"
            >
                Próxima Frase
            </button>
        </div>
    );
};

export default StatsDisplay;
