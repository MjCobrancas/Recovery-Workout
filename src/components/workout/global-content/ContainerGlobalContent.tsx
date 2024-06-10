'use client'

import { Button } from "@/components/Button"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { IWorkoutAllGlobalFiles, IWorkoutGlobalContent } from "@/interfaces/workout/global-content/GlobalContent"
import { useState } from "react"
import { CreateGlobalContent } from "./CreateGlobalContent"
import { Toaster } from "react-hot-toast"
import { EditGlobalContent } from "./EditGlobalContent"
import { IResultDefaultResponse } from "@/interfaces/Generics"
import { getGlobalFiles } from "@/api/workout/global-content/getGlobalFiles"
import { Ancora } from "@/components/Ancora"

export function ContainerGlobalContent({ WorkoutAllPhases }: IWorkoutGlobalContent) {

    const [principalText, setPrincipalText] = useState<string>("Enviar Arquivos Globais")
    const [isSentFile, setIsSentFile] = useState(true)
    const [globalAllFiles, setGlobalAllFiles] = useState<IWorkoutAllGlobalFiles | null>(null)

    function handleNavigateButtons() {
        setIsSentFile((state) => !state)
        setPrincipalText((state) => state == "Enviar Arquivos Globais" ? "Editar Arquivos Globais" : "Enviar Arquivos Globais")
    }

    function setGlobalFiles(globalFiles: IWorkoutAllGlobalFiles) {
        setGlobalAllFiles(globalFiles)
    }

    async function handleGetGlobalFiles() {
        const globalFiles: IResultDefaultResponse<IWorkoutAllGlobalFiles | null> = await getGlobalFiles()

        if (globalFiles.data != null) {
            setGlobalAllFiles(globalFiles.data)
            handleNavigateButtons()
        }
    }

    return (
        <PaperBlock>
            <TextPrincipal text={principalText} styles={`max-md:text-[2rem]`} />

            <div className="text-center">
                <span className="font-medium">Navegar nas abas:</span>
            </div>
            <div className="flex justify-center items-center gap-2">
                <Button
                    styles="w-fit p-2"
                    type="button"
                    text="Enviar conteúdo global"
                    disabled={isSentFile}
                    OnClick={() => handleNavigateButtons()}
                />
                <div
                    className={``}
                >
                    <Button
                        styles="w-fit p-2"
                        type="submit"
                        text="Editar conteúdos globais"
                        disabled={!isSentFile}
                        OnClick={() => handleGetGlobalFiles()}
                    />
                </div>

            </div>

            <div className="p-8 mt-5">
                {isSentFile ? (
                    <CreateGlobalContent WorkoutAllPhases={WorkoutAllPhases} />
                ) : (
                    <EditGlobalContent
                        setGlobalFiles={setGlobalFiles}
                        WorkoutAllPhases={WorkoutAllPhases}
                        globalAllFiles={globalAllFiles!}
                    />
                )}
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <Ancora
                title="Voltar"
                toGo="/workout/members"
                styles={`ml-1 mb-1 w-16`}
            />
        </PaperBlock>
    )

}