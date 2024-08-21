'use client'

import { IContainerPrepareAvaliationProps } from "@/interfaces/workout/prepare-avaliation/IContainerPrepareAvaliation"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { PrepareTyperacerInitialForm } from "../prepare-typeracer/PrepareTyperacerInitialForm"
import { EditQuotesForm } from "./EditQuotesForm"
import { IQuotes } from "@/interfaces/workout/prepare-typeracer/IEditQuotes"
import { TyperacerCreatePhrase} from "./TyperacerCreatePhrase"

export function ContainerPrepareTyperacer({ creditors }: IContainerPrepareAvaliationProps) {

    const [showTypeInterface, setShowTypeInterface] = useState<"create-quote" | "edit-quotes" | "">("")
    const [idCreditor, setIdCreditor] = useState(0)
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [creditorQuotes, setCreditorQuotes] = useState<IQuotes[]>([])

    function setValueCreditorQuotes(value: IQuotes[]) {
        setCreditorQuotes(value)
    }

    function setValueDisableAllButtons(value: boolean) {
        setDisableAllButtons(value)
    }

    function setValueShowTypeInterface(value: "create-quote" | "edit-quotes" | "") {
        setShowTypeInterface(value)
    }

    function setValueIdCreditor(value: number) {
        setIdCreditor(value)
    }

    return (
        <div className="w-full h-fit flex justify-center items-center">
            <div className="flex flex-col gap-3 justify-center items-center p-10 mb-20 w-[900px] border-[2px] border-gray-300 rounded">
                <PrepareTyperacerInitialForm 
                    creditors={creditors}
                    setValueShowTypeInterface={setValueShowTypeInterface}
                    setValueIdCreditor={setValueIdCreditor}
                    disableAllButtons={disableAllButtons}
                    setValueCreditorQuotes={setValueCreditorQuotes}
                />

                {showTypeInterface == "create-quote" && (
                    <TyperacerCreatePhrase idCreditor={idCreditor} disableAllButtons={disableAllButtons} setValueDisableAllButtons={setValueDisableAllButtons} />
                )}

                {showTypeInterface == "edit-quotes" && (
                    <EditQuotesForm 
                        creditorQuotes={creditorQuotes}
                        disableAllButtons={disableAllButtons}
                        setValueDisableAllButtons={setValueDisableAllButtons}
                    />
                )}
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    )
}
