'use client'

import { verifyUserToken } from "@/api/generics/verifyToken";
import { getQuotesByIdCreditor } from "@/api/workout/prepare-typeracer/getQuotesByIdCreditor";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IPrepareAvaliationInitialForm, IPrepareAvaliationInitialFormSchema } from "@/interfaces/workout/prepare-avaliation/IPrepareAvaliationInitialForm";
import { IPrepareTyperacerInitialFormProps } from "@/interfaces/workout/prepare-typeracer/IPrepareTyperacerInitialForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function PrepareTyperacerInitialForm({ creditors, disableAllButtons, setValueCreditorQuotes, setValueIdCreditor, setValuePositions, setValueShowTypeInterface }: IPrepareTyperacerInitialFormProps) {

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IPrepareAvaliationInitialForm>({
        defaultValues: {
            idCreditor: "0",
            selectOption: "0"
        },
        resolver: zodResolver(IPrepareAvaliationInitialFormSchema)
    })

    const [didFilter, setDidFilter] = useState(false)
    const [headerSelected, setHeaderSelected] = useState(false)

    function removeFilters() {
        setValueShowTypeInterface("")
        setDidFilter(false)
        setHeaderSelected(false)
        setValueIdCreditor(0)
        reset()
    }

    async function handleSubmitInitialForm(data: FieldValues) {
        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push("/login")
        }

        if (data.selectOption == "1") {
            setHeaderSelected(true)
            setDidFilter(true)
            setValueIdCreditor(Number(data.idCreditor))
            setValueShowTypeInterface("create-quote")

            return
        }

        setHeaderSelected(true)
        setDidFilter(true)

        const creditorQuotes = await getQuotesByIdCreditor(Number(data.idCreditor))

        if (!creditorQuotes.status) {
            toast.error("Houve um erro em buscar as frases de digitação do credor, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        setValueCreditorQuotes(creditorQuotes.data.length <= 0 ? [] : creditorQuotes.data)
        setValueShowTypeInterface("edit-quotes")
    }

    return (
        <form 
            onSubmit={handleSubmit(handleSubmitInitialForm)}
        >
            <div className="flex justify-between items-center w-full">
                <FieldForm
                    label="idCreditor"
                    name="Credor"
                    obrigatory={true}
                    error={errors.idCreditor && "Inválido"}
                    styles="mr-3"
                >
                    <SelectField
                        name="idCreditor"
                        id="idCreditor"
                        styles={
                            errors.idCreditor
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                        }
                        disabled={headerSelected || disableAllButtons}
                        onForm={true}
                        register={register}
                        value={watch("idCreditor")}
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {creditors.map((creditor, index) => {
                            return (
                                <Option key={index} value={creditor.Id_Creditor} firstValue={creditor.Creditor} />
                            )
                        })}

                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="fieldOption"
                    name="Selecione a opção"
                    obrigatory={true}
                    error={errors.selectOption && "Inválido"}
                    styles="mr-3"
                >
                    <SelectField
                        name="selectOption"
                        id="selectOption"
                        styles={
                            errors.selectOption
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                        }
                        disabled={headerSelected || disableAllButtons}
                        onForm={true}
                        register={register}
                    >
                        <Option value={"0"} firstValue={"Selecione"} />
                        <Option value={"1"} firstValue={"Criar frase"} />
                        <Option value={"2"} firstValue={"Organizar frases"} />
                    </SelectField>
                </FieldForm>

                <Button
                    type="submit"
                    text="Buscar"
                    styles={`w-24 h-10 mr-3 text-md self-end`}
                    disabled={headerSelected || disableAllButtons}
                />

                <Button
                    type="button"
                    text="Remover filtros"
                    styles={`w-[360px] h-10 self-end text-md font-medium p-2 border border-red-400 text-red-500 rounded-md focus:bg-red-400 hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                    disabled={!didFilter || disableAllButtons}
                    OnClick={() => removeFilters()}
                />
            </div>
        </form>
    )
}