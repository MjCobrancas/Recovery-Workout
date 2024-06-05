'use client'

import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function AvaliationButton({ typeFile }: { typeFile: string }) {
    return (
        <form
            className={`h-full flex items-center`}
        >
            <div className={`ml-4`}>
                <FontAwesomeIcon icon={faFilePen} />
            </div>

            <button
                type="button"
                className={`w-full h-full p-5 text-left`}
                onClick={() => console.log("YL Bittersweet Memories")}
            >
                Avaliação
            </button>
        </form>
    )
}