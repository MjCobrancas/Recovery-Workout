'use client'

import { ModalTrainingBar } from "@/components/ModalTrainingBar"
import { PaperBlock } from "@/components/PaperBlock"
import { SelectTrainingFile } from "@/components/SelectTrainingFile"
import { TextPrincipal } from "@/components/TextPrincipal"
import { AvaliationButton } from "./AvaliationButton"
import { useState } from "react"

export default function ContainerInstructions({ workoutFiles, initialGlobalFiles }: any) {

    const [typeFile, setTypeFile] = useState("none")
    const [blobList, setBlobList] = useState([])
    const [fileUrl, setFileUrl] = useState("")
    const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null)

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
                results.forEach((result) => {
                    blobList.push(result)
                    setBlobList(blobList)
                    setTypeFile("file")

                    
                    setFileUrl(result.value.url)
                    console.log(blobList)
                    if (FileExtension == ".mp3" || FileExtension == ".wav") {
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
                    <SelectTrainingFile typeFile={typeFile} fileUrl={fileUrl} YoutubeExternalVideo={youtubeUrl} CreditorQuestions={[]} CreditorInfo={[]} />
                </div>

                <div id="pdf" className={`flex flex-col justify-start gap-1 w-1/3 min-w-[15rem] rounded-md border-2 p-1 max-h-[500px] overflow-y-auto dark:border-slate-500`}>
                    {workoutFiles.data != null ? workoutFiles.data.map((item: any, i: number) => {
                        return (
                            <>
                                {i == 0 ? (
                                    <>
                                        <ModalTrainingBar
                                            key={Math.random()}
                                            creditorFiles={item.creditorFiles}
                                            globalFiles={item.globalFiles}
                                            initialGlobalFiles={initialGlobalFiles.data}
                                            operatorFiles={item.operatorFiles}
                                            index={i}
                                            getFileCallBack={getFileCallBack}
                                        />

                                        <ModalTrainingBar
                                            key={Math.random()}
                                            creditorFiles={item.creditorFiles}
                                            globalFiles={item.globalFiles}
                                            initialGlobalFiles={initialGlobalFiles.data}
                                            operatorFiles={item.operatorFiles}
                                            index={i + 1}
                                            getFileCallBack={getFileCallBack}
                                        />
                                    </>
                                ) : (
                                    <ModalTrainingBar
                                        key={Math.random()}
                                        creditorFiles={item.creditorFiles}
                                        globalFiles={item.globalFiles}
                                        initialGlobalFiles={initialGlobalFiles.data}
                                        operatorFiles={item.operatorFiles}
                                        index={i + 1}
                                        getFileCallBack={getFileCallBack}
                                    />
                                )}

                            </>
                        )
                    }) : <p>Houve um problema para carregar os arquivos do treinamento</p>}

                    <div className={`mt-[-1px] font-bold text-[--bg-login] border-solid border-[1px] border-blue-500 rounded-md dark:text-[--text-input-dark] ${workoutFiles.data[4].creditorFiles.length > 0 || workoutFiles.data[4].operatorFiles.length > 0 || workoutFiles.data[4].globalFiles.length > 0 ? "cursor-pointer hover:bg-[--hover-light-route] dark:hover:bg-[--hover-dark-route]" : "bg-slate-100 dark:bg-slate-600 dark:border-slate-500 cursor-not-allowed"}`}>
                        <AvaliationButton typeFile={typeFile} />
                    </div>
                </div>

            </div>
        </PaperBlock>
    )
}