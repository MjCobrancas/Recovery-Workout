'use client'

import { Button } from "@/components/Button";
import { TextPrincipal } from "@/components/TextPrincipal";
import { IContainerOperatorContent } from "@/interfaces/workout/operator-content/IContainerOperatorContent";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { CreateOperatorContent } from "./CreateOperatorContent";
import { EditSearchOperatorContent } from "./EditSearchOperatorContent";

export function ContainerOperatorContent({ operators, workoutGetAllPhases }: IContainerOperatorContent) {

    const [principalText, setPrincipalText] = useState<string>("Enviar Arquivos do operador")
    const [isSentFile, setIsSentFile] = useState(true)

    function handleNavigateButtons() {
        setIsSentFile((state) => !state)
        setPrincipalText((state) => state == "Enviar Arquivos do operador" ? "Editar Arquivos do operador" : "Enviar Arquivos do operador")
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
                    text="Enviar conteúdo do operador"
                    disabled={isSentFile}
                    OnClick={() => handleNavigateButtons()}
                />
                <div
                    className={``}
                >
                    <Button
                        styles="w-fit p-2"
                        type="submit"
                        text="Editar conteúdos do operador"
                        disabled={!isSentFile}
                        OnClick={() => handleNavigateButtons()}
                    />
                </div>

            </div>

            <div className="p-8 mt-5">
                {isSentFile ? (
                    <CreateOperatorContent operators={operators} workoutGetAllPhases={workoutGetAllPhases} />
                ) : (
                    <EditSearchOperatorContent operators={operators} workoutGetAllPhases={workoutGetAllPhases} />
                )}
            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}