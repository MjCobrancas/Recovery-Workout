'use client'

import { ModalTrainingBar } from "@/components/ModalTrainingBar"
import { PaperBlock } from "@/components/PaperBlock"
import { SelectTrainingFile } from "@/components/SelectTrainingFile"
import { TextPrincipal } from "@/components/TextPrincipal"
import { AvaliationButton } from "./AvaliationButton"
import { useState } from "react"
import { IContainerInstructionsProps } from "@/interfaces/workout/instructions/IContainerInstructions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faKeyboard, faLock, faMicrophoneLines } from "@fortawesome/free-solid-svg-icons"
import { Toaster } from "react-hot-toast"
import { IAvaliationQuestions, ICreditorQuestionsHeader } from "@/interfaces/workout/instructions/IAvaliationForm"

export default function ContainerInstructions({ workoutFiles, initialGlobalFiles, quotes }: IContainerInstructionsProps) {

    const [typeFile, setTypeFile] = useState("none")
    const [fileUrl, setFileUrl] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null)
    const [CreditorQuestions, setCreditorQuestions] = useState<IAvaliationQuestions[]>([])
    const [CreditorInfo, setCreditorInfo] = useState<ICreditorQuestionsHeader[]>([])

    function changeTypeFileToAvaliation(creditorInfo: ICreditorQuestionsHeader[], creditorQuestions: IAvaliationQuestions[]) {
        setTypeFile("avaliation")
        setCreditorInfo(creditorInfo)
        setCreditorQuestions(creditorQuestions)
    }

    function changeTypeFile(type: string) {
        setTypeFile(type)
    }

    function getFileCallBack(
        Id_File_Creditor: number,
        YoutubeExternalVideo: string | null,
        Function_Name: Function,
        FileExtension: string
    ) {
        setTypeFile("loading")
        if (YoutubeExternalVideo == null) {
            const request = Function_Name(
                Id_File_Creditor
            )

            const promises = [request]
            Promise.allSettled(promises).then((results) => {
                results.forEach((result: any) => {
                    const binaryData = Buffer.from(result.value.object.file)
                    const fileBase64 = URL.createObjectURL(
                        new Blob([binaryData.buffer], { type: result.value.object.type })
                    )

                    setTypeFile("file")

                    setFileUrl(fileBase64)
                    if (result.value.object.type == "audio/wav") {
                        setTypeFile("audio")
                    }
                })
            })
        } else {
            setTypeFile("video")
            setYoutubeUrl(YoutubeExternalVideo)
        }
    }

    return (
        <PaperBlock>
            <TextPrincipal text="Treinamento" styles={`max-md:text-[2rem]`} />

            <div className={`flex justify-between m-2`}>
                <div className={`flex flex-col flex-1 gap-2 max-w-[50rem] mr-2 border-[1px] border-gray-300 rounded-md h-[500px]`}>
                    <SelectTrainingFile quotes={quotes} typeFile={typeFile} fileUrl={fileUrl} YoutubeExternalVideo={youtubeUrl} CreditorQuestions={CreditorQuestions} CreditorInfo={CreditorInfo} />
                </div>

                <div id="pdf" className={`flex flex-col justify-start gap-1 w-1/3 min-w-[15rem] rounded-md border-2 p-1 max-h-[500px] overflow-y-auto dark:border-slate-500`}>
                    {workoutFiles != null ? workoutFiles.map((item, i: number) => {
                        return (
                            <>
                                <ModalTrainingBar
                                    key={Math.random()}
                                    creditorFiles={item.creditorFiles}
                                    globalFiles={item.globalFiles}
                                    initialGlobalFiles={initialGlobalFiles!}
                                    operatorFiles={item.operatorFiles}
                                    index={i}
                                    getFileCallBack={getFileCallBack}
                                />
                            </>
                        )
                    }) : <p>Houve um problema para carregar os arquivos do treinamento</p>}

                    {workoutFiles![4].creditorFiles.length > 0 || workoutFiles![4].operatorFiles.length > 0 || workoutFiles![4].globalFiles.length > 0 ? (
                        <div className={`mt-[-1px] font-bold text-[--bg-login] border-solid border-[1px] border-blue-500 rounded-md dark:text-[--text-input-dark] ${workoutFiles![4].creditorFiles.length > 0 || workoutFiles![4].operatorFiles.length > 0 || workoutFiles![4].globalFiles.length > 0 ? "cursor-pointer hover:bg-[--hover-light-route] dark:hover:bg-[--hover-dark-route]" : "bg-slate-100 dark:bg-slate-600 dark:border-slate-500 cursor-not-allowed"}`}>
                            <AvaliationButton
                                changeTypeFileToAvaliation={changeTypeFileToAvaliation}
                                changeTypeFile={changeTypeFile}
                            />
                        </div>
                    ) : (
                        <div className={`mt-[-1px] font-bold text-[--bg-login] border-solid border-[1px] border-blue-500 rounded-md dark:text-[--text-input-dark] bg-slate-200 dark:bg-slate-600 dark:border-slate-500 cursor-not-allowed"}`}>
                            <div
                                className={`h-full flex items-center`}
                            >
                                <div className={`ml-5 w-5 h-5`}>
                                    <FontAwesomeIcon icon={faLock} className="w-5 h-5" />
                                </div>

                                <button
                                    type="button"
                                    className={`w-full h-full p-4 ml-1 text-left cursor-not-allowed`}
                                >
                                    Avaliação
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={`mt-[-1px] font-bold text-[--bg-login] border-solid border-[1px] border-blue-500 rounded-md dark:text-[--text-input-dark]`}>
                        <div
                            className={`h-full flex items-center`}
                        >
                            <div className={`ml-5 w-5 h-5`}>
                                <FontAwesomeIcon icon={faMicrophoneLines} className="w-5 h-5 ml-1" />
                            </div>

                            <button
                                type="button"
                                className={`w-full h-full p-4 text-left`}
                                onClick={() => setTypeFile("voice")}
                            >
                                Exercício: Ouça sua voz
                            </button>
                        </div>
                    </div>

                    <div className={`mt-[-1px] font-bold text-[--bg-login] border-solid border-[1px] border-blue-500 rounded-md dark:text-[--text-input-dark]`}>
                        <div
                            className={`h-full flex items-center`}
                        >
                            <div className={`ml-5 w-5 h-5`}>
                                <FontAwesomeIcon icon={faKeyboard} className="w-5 h-5 ml-1" />
                            </div>

                            <button
                                type="button"
                                className={`w-full h-full p-4 text-left`}
                                onClick={() => setTypeFile("keyboard")}
                            >
                                Exercício: Precisão na digitação
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </PaperBlock>
    )
}