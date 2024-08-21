'use client'

import { IContainerPrepareAvaliationProps } from "@/interfaces/workout/prepare-avaliation/IContainerPrepareAvaliation"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { ICreditorAvaliationQuestions } from "@/interfaces/workout/prepare-avaliation/IPrepareAvaliationInitialForm"
import { PrepareTyperacerInitialForm } from "../prepare-typeracer/PrepareTyperacerInitialForm"

export function ContainerPrepareTyperacer({ creditors }: IContainerPrepareAvaliationProps) {

    const [showTypeInterface, setShowTypeInterface] = useState("")
    const [idCreditor, setIdCreditor] = useState(0)
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [creditorQuotes, setCreditorQuotes] = useState<ICreditorAvaliationQuestions[]>([])
    const [positionsValue, setPositionsValue] = useState<number[]>([0, 0])
    
    function setValuePositions(value: number[]) {
        setPositionsValue(value)
    }

    function setValueCreditorQuotes(value: ICreditorAvaliationQuestions[]) {
        setCreditorQuotes(value)
    }

    function setValueDisableAllButtons(value: boolean) {
        setDisableAllButtons(value)
    }

    function setValueShowTypeInterface(value: string) {
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
                    setValuePositions={setValuePositions}
                />

                {showTypeInterface == "create-quote" && (
                    <p>Criar frases digitação do credor</p>
                )}

                {showTypeInterface == "edit-quotes" && (
                    <p>Editar frases de digitação do credor</p>
                )}
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    )
}
