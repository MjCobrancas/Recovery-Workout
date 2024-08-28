import { verifyUserToken } from "@/api/generics/verifyToken";
import { updateQuotes } from "@/api/workout/prepare-typeracer/updateQuotes";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { IEditQuotesProps, IEditQuotesSchema, IQuotes } from "@/interfaces/workout/prepare-typeracer/IEditQuotes";
import { faArrowDown, faArrowUp, faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { DialogCloneQuotesHeader } from "./dialog-clone-quotes/DialogCloneQuotesHeader";

export function EditQuotesForm({ idCreditor, creditors, creditorQuotes, disableAllButtons, setValueDisableAllButtons }: IEditQuotesProps) {

    const router = useRouter()

    const lowestPosition = useRef(creditorQuotes.length > 0 ? creditorQuotes[0].Position : 0)
    const highestPosition = useRef(creditorQuotes.length > 0 ? creditorQuotes[creditorQuotes.length - 1].Position : 0)

    const dialog = useRef<HTMLDialogElement>(null)

    const { control, register, handleSubmit, watch, formState: { errors }, reset, getValues } = useForm<{ creditorQuotesArray: IQuotes[] }>({
        defaultValues: {
            creditorQuotesArray: useMemo(() => {
                return creditorQuotes.map((item) => {
                    return {
                        Id_Phrase: item.Id_Phrase,
                        Phrase: item.Phrase,
                        Phrase_Reference: item.Phrase_Reference,
                        Position: item.Position,
                        Status: item.Status
                    }
                })
            }, [creditorQuotes])
        },
        resolver: zodResolver(IEditQuotesSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "creditorQuotesArray"
    })

    useEffect(() => {
        const creditorQuotesData: IQuotes[] = []
        if (creditorQuotesData.length == 0) {
            return
        }

        creditorQuotesData.map((item) => {

            const { Id_Phrase, Phrase, Phrase_Reference, Position, Status } = item

            creditorQuotesData.push({
                Id_Phrase,
                Phrase,
                Phrase_Reference,
                Status,
                Position
            })
        })

        reset({ creditorQuotesArray: creditorQuotesData })

    }, [creditorQuotes, reset])

    function goPositionUp(position: number, index: number) {
        if (position == lowestPosition.current) {
            return
        }

        const objectUpdateDown = getValues(`creditorQuotesArray.${index - 1}`)
        const objectUpdateUp = getValues(`creditorQuotesArray.${index}`)
        objectUpdateUp.Position = objectUpdateDown.Position
        objectUpdateDown.Position = position

        update(index - 1, objectUpdateDown)
        update(index, objectUpdateUp)

        reset({ creditorQuotesArray: getValues(`creditorQuotesArray`).sort((a, b) => a.Position - b.Position) })
    }

    function goPositionDown(position: number, index: number) {
        if (position == highestPosition.current) {
            return
        }

        const objectUpdateDown = getValues(`creditorQuotesArray.${index}`)
        const objectUpdateUp = getValues(`creditorQuotesArray.${index + 1}`)
        objectUpdateDown.Position = objectUpdateUp.Position
        objectUpdateUp.Position = position

        update(index, objectUpdateDown)
        update(index + 1, objectUpdateUp)

        reset({ creditorQuotesArray: getValues(`creditorQuotesArray`).sort((a, b) => a.Position - b.Position) })
    }

    function handleChangeQuoteStatus(status: boolean, index: number) {
        const object = fields[index]
        object.Status = !status

        update(index, object)
    }

    async function handleUpdateQuotes(data: FieldValues) {

        setValueDisableAllButtons(true)

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        const updateQuotesResponse = await updateQuotes<typeof data.creditorQuotesArray>(data.creditorQuotesArray)

        setValueDisableAllButtons(false)

        if (!updateQuotesResponse.status) {
            toast.error("Houve um erro na atualização das frases dos credores, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        toast.success("Atualização de frases realizada com sucesso!", {
            duration: 5000
        })
    }

    function openDialog() {
        dialog.current?.showModal()
    }

    function closeDialog() {
        dialog.current?.close()
    }

    return (
        <>
            <dialog
                id="open-dialog"
                ref={dialog}
                className="fixed w-[80%] h-[80%] p-2 rounded-lg dark:bg-zinc-900 max-sm:w-full"
            >
                <DialogCloneQuotesHeader
                    idCreditor={idCreditor}
                    creditors={creditors}
                    creditorQuotes={creditorQuotes.filter((item) => item.Status == true)}
                    disableAllButtons={disableAllButtons}
                    setDisableAllButtons={setValueDisableAllButtons}
                    closeDialog={closeDialog}
                />
            </dialog>
            {fields.length > 0 ? (
                <form
                    className="flex flex-col gap-3 justify-center items-center px-10 w-[900px] border-gray-300 rounded"
                    onSubmit={handleSubmit(handleUpdateQuotes)}
                >
                    <button 
                        type="button"
                        className="self-start mt-5 flex justify-center items-center gap-3 group"
                        onClick={openDialog}
                    >
                        <FontAwesomeIcon 
                            icon={faPlus} 
                            className="px-2 py-2 bg-green-400 dark:bg-green-500 rounded-md text-white dark:group-hover:bg-green-600 group-hover:bg-green-500 duration-300"
                        />
                        Clonar frases para outro credor
                    </button>
                    <table className="w-full mt-10">
                        <thead className="w-full bg-gray-200 dark:bg-zinc-800">
                            <tr>
                                <th className="pl-6 text-left w-1/3 font-semibold p-2 dark:text-white/80 rounded-tl-md">Frase</th>
                                <th className="pl-6 text-left w-1/3 font-semibold p-2 dark:text-white/80">Referência</th>
                                <th className="text-center font-semibold p-2 dark:text-white/80">Ações</th>
                                <th className="text-center font-semibold p-2 dark:text-white/80 rounded-tr-md">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((item, index) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className="h-fit odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800 transition"
                                    >
                                        <td className="h-fit p-2 text-center">
                                            <Input
                                                id={`creditorQuotesArray.${index}.Phrase`}
                                                name={`creditorQuotesArray.${index}.Phrase`}
                                                type="input"
                                                placeholder="Digite a frase"
                                                value={watch(`creditorQuotesArray.${index}.Phrase`)}
                                                disabled={disableAllButtons}
                                                styles={errors.creditorQuotesArray && errors.creditorQuotesArray[index]?.Phrase ? "border-red-400" : ""}
                                                onForm={true}
                                                register={register}
                                            />
                                        </td>
                                        <td className="h-fit p-2 text-center">
                                            <Input
                                                id={`creditorQuotesArray.${index}.Phrase_Reference`}
                                                name={`creditorQuotesArray.${index}.Phrase_Reference`}
                                                type="input"
                                                placeholder="Digite o contexto da frase"
                                                value={watch(`creditorQuotesArray.${index}.Phrase_Reference`)}
                                                disabled={disableAllButtons}
                                                styles={errors.creditorQuotesArray && errors.creditorQuotesArray[index]?.Phrase_Reference ? "border-red-400" : ""}
                                                onForm={true}
                                                register={register}
                                            />
                                        </td>
                                        <td className="p-2 h-5 text-center">
                                            <button
                                                type="button"
                                                className="inline px-[9px] mr-[6px] py-1 duration-200 rounded-md cursor-pointer hover:text-white w-fit bg-green-400 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:text-black"
                                                onClick={() => goPositionUp(item.Position, index)}
                                                disabled={item.Position == lowestPosition.current || disableAllButtons}
                                            >
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            </button>
                                            <button
                                                type="button"
                                                className="inline px-[9px] py-1 duration-200 rounded-md cursor-pointer hover:text-white w-fit bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600 disabled:bg-gray-400 disabled:hover:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:text-black"
                                                onClick={() => goPositionDown(item.Position, index)}
                                                disabled={item.Position == highestPosition.current || disableAllButtons}
                                            >
                                                <FontAwesomeIcon icon={faArrowDown} />
                                            </button>
                                        </td>
                                        <td className="p-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleChangeQuoteStatus(item.Status, index)}
                                                className={` px-2 py-1 duration-300 rounded-md hover:text-white w-fit disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:text-black ${item.Status
                                                    ? ` bg-green-400 dark:bg-green-500 hover:bg-green-500 dark:hover:bg-green-600`
                                                    : `bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600 px-[9px]`
                                                    }`}
                                                disabled={disableAllButtons}
                                            >
                                                {item.Status ? (
                                                    <FontAwesomeIcon icon={faCheck} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faXmark} />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <Button
                        type="submit"
                        name="idQuotes"
                        text="Salvar Alterações"
                        styles={`w-30 h-11 mt-8 text-md self-end`}
                        disabled={disableAllButtons}
                    />

                </form>
            ) : (
                <p className="text-red-500 mt-6 font-bold">Não foi cadastrado frases neste credor</p>
            )}
        </>
    )
}