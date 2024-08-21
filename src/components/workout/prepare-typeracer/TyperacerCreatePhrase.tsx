'use client'

import { verifyUserToken } from "@/api/generics/verifyToken";
import { createQuote } from "@/api/workout/typerace/createQuote";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { ITyperacerCreateQuestion } from "@/interfaces/workout/prepare-typeracer/ITyperacerCreateQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function TyperacerCreatePhrase({ idCreditor, disableAllButtons, setValueDisableAllButtons }: ITyperacerCreateQuestion) {

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<{ phrase: string, phraseReference: string }>({
        defaultValues: {
            phrase: "",
            phraseReference: "",
        },
        resolver: zodResolver(z.object({ phrase: z.string().min(1), phraseReference: z.string().min(1) }))
    })

    async function handleCreatePhrase(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setValueDisableAllButtons(true)

        const object = {
            phrase: String(data.phrase),
            phrase_reference: String(data.phraseReference),
            status: true,
            id_creditor: Number(idCreditor)
        }

        const responseCreatePhrase = await createQuote<typeof object>(object)

        console.log(object)

        console.log(responseCreatePhrase)

        setValueDisableAllButtons(false)

        if (!responseCreatePhrase.status) {
            toast.error("Houve um erro na criação da frase, revise os valores e tente novamente")

            return
        }

        toast.success("Frase cadastrada com sucesso!")
        reset()
    }

    return (
        <form className={`w-full flex justify-start items-center mt-14`} onSubmit={handleSubmit(handleCreatePhrase)}>
            <div className={`flex justify-between items-center gap-3 flex-1`}>
                <div className="flex gap-3">
                    <FieldForm
                        label="quoteField"
                        name="Frase"
                        error={errors.phrase && "Inválido"}
                    >

                        <Input
                            id="phrase"
                            name="phrase"
                            type="input"
                            styles={`${String("") == `quoteField`
                                ? "border-[label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }`}
                            placeholder="Digite a frase"
                            disabled={disableAllButtons}
                            onForm={true}
                            register={register}
                            value={watch("phrase")}
                        />
                    </FieldForm>


                    <FieldForm
                        label="referenceField"
                        name="Referência"
                        error={errors.phraseReference && "Inválido"}
                    >

                        <Input
                            id="phraseReference"
                            name="phraseReference"
                            type="input"
                            styles={`${String("") == `referenceField`
                                ? "border-[label-color-error] dark:border-[--label-color-error]"
                                : ""
                            }`}
                            placeholder="Digite a referência"
                            disabled={disableAllButtons}
                            onForm={true}
                            register={register}
                            value={watch("phraseReference")}
                        />
                    </FieldForm>
                </div>

                <Button
                    type="submit"
                    name="idQuote"
                    text="Salvar Alterações"
                    styles={`w-80 h-11 text-md self-end`}
                    disabled={disableAllButtons}
                />
            </div>
        </form >
    )
}