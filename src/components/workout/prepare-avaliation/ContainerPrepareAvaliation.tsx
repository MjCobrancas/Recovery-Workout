'use client'

import { IContainerPrepareAvaliationProps } from "@/interfaces/workout/prepare-avaliation/IContainerPrepareAvaliation"
import { PrepareAvaliationInitialForm } from "./PrepareAvaliationInitialForm"
import { useState } from "react"
import { AvaliationCreateQuestionForm } from "./AvaliationCreateQuestionForm"
import { Toaster } from "react-hot-toast"
import { AvaliationEditQuestionsForm } from "./AvaliationEditQuestionsForm"
import { ICreditorAvaliationQuestions } from "@/interfaces/workout/prepare-avaliation/IPrepareAvaliationInitialForm"

export function ContainerPrepareAvaliation({ creditors }: IContainerPrepareAvaliationProps) {

    const [showTypeInterface, setShowTypeInterface] = useState("")
    const [idCreditor, setIdCreditor] = useState(0)
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [creditorQuestions, setCreditorQuestions] = useState<ICreditorAvaliationQuestions[]>([])
    const [positionsValue, setPositionsValue] = useState<number[]>([0, 0])
    
    function setValuePositions(value: number[]) {
        setPositionsValue(value)
    }

    function setValueCreditorQuestions(value: ICreditorAvaliationQuestions[]) {
        setCreditorQuestions(value)
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
                <PrepareAvaliationInitialForm
                    creditors={creditors}
                    setValueShowTypeInterface={setValueShowTypeInterface}
                    setValueIdCreditor={setValueIdCreditor}
                    disableAllButtons={disableAllButtons}
                    setValueCreditorQuestions={setValueCreditorQuestions}
                    setValuePositions={setValuePositions}
                />

                {showTypeInterface == "create-question" && (
                    <AvaliationCreateQuestionForm idCreditor={idCreditor} disableAllButtons={disableAllButtons} setValueDisableAllButtons={setValueDisableAllButtons} />
                )}

                {showTypeInterface == "edit-question" && (
                    <AvaliationEditQuestionsForm 
                        creditorQuestions={creditorQuestions} 
                        positionsValue={positionsValue} 
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
