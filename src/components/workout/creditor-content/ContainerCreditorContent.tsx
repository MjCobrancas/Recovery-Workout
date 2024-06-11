'use client'

import { Button } from "@/components/Button";
import { TextPrincipal } from "@/components/TextPrincipal";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { CreateCreditorContent } from "./CreateCreditorContent";
import { IContainerCreditorContent } from "@/interfaces/workout/creditor-content/IContainerCreditorContent";
import { EditSearchCreditorContent } from "./EditSearchCreditorContent";

export function ContainerCreditorContent({ creditors, workoutGetAllPhases }: IContainerCreditorContent) {

    const [principalText, setPrincipalText] = useState<string>("Enviar Arquivos do Credor")
    const [isSentFile, setIsSentFile] = useState(true)

    function handleNavigateButtons() {
        setIsSentFile((state) => !state)
        setPrincipalText((state) => state == "Enviar Arquivos do Credor" ? "Editar Arquivos do Credor" : "Enviar Arquivos do Credor")
    }

    return (
        <>
            <TextPrincipal text={principalText} />
            <div className="text-center">
                <span className="font-medium">Navegar nas abas:</span>
            </div>
            <div className="flex justify-center items-center gap-2">
                <Button
                    styles="w-fit p-2"
                    type="button"
                    text="Enviar conteúdo do credor"
                    disabled={isSentFile}
                    OnClick={() => handleNavigateButtons()}
                />
                <div
                    className={``}
                >
                    <Button
                        styles="w-fit p-2"
                        type="submit"
                        text="Editar conteúdos do credor"
                        disabled={!isSentFile}
                        OnClick={() => handleNavigateButtons()}
                    />
                </div>

            </div>

            <div className="p-8 mt-5">
                {isSentFile ? (
                    <CreateCreditorContent Creditors={creditors} WorkoutAllPhases={workoutGetAllPhases} />
                ) : (
                    <EditSearchCreditorContent Creditors={creditors} WorkoutGetAllPhases={workoutGetAllPhases} />
                )}
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}