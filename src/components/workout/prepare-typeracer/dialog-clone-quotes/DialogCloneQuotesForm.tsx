import { verifyUserToken } from "@/api/generics/verifyToken";
import { cloneQuotes } from "@/api/workout/prepare-typeracer/cloneQuotes";
import { Button } from "@/components/Button";
import { IDialogCloneForm, IDialogCloneQuotesFormProps, IQuotesCloneUpdateResponse } from "@/interfaces/workout/prepare-typeracer/IDialogCloneQuotes";
import { IQuotes } from "@/interfaces/workout/prepare-typeracer/IEditQuotes";
import { faArrowDown, faArrowLeft, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function DialogCloneQuotesForm({ cloneIdCreditor, creditorQuotes, creditorCloneQuotes, disableAllButtons, setDisableAllButtons, handleCloseDialog }: IDialogCloneQuotesFormProps) {

    const router = useRouter()

    const lowestIndex = useRef(creditorCloneQuotes.map(item => item.Status).indexOf(true))
    const [highestIndex, setHighestIndex] = useState(creditorCloneQuotes.findLastIndex((item) => item.Status == true))

    const { control, handleSubmit, getValues } = useForm<{ creditorQuotesArray: IDialogCloneForm[], creditorQuotesCloneArray: IDialogCloneForm[] }>({
        defaultValues: {
            creditorQuotesCloneArray: useMemo(() => {
                return creditorCloneQuotes.map((item) => {
                    return {
                        Id_Phrase: item.Id_Phrase,
                        Phrase: item.Phrase,
                        Phrase_Reference: item.Phrase_Reference,
                        Position: item.Position,
                        Status: item.Status,
                        IsNew: false
                    }
                })
            }, [creditorCloneQuotes]),

            creditorQuotesArray: useMemo(() => {
                return creditorQuotes.map((item) => {
                    return {
                        Id_Phrase: item.Id_Phrase,
                        Phrase: item.Phrase,
                        Phrase_Reference: item.Phrase_Reference,
                        Position: item.Position,
                        Status: item.Status,
                        IsNew: true
                    }
                })
            }, [creditorQuotes]),
        }
    })

    const { fields: fieldsCreditorClone, insert: insertCreditorClone, update: updateCreditorClone, remove: removeCreditorClone } = useFieldArray({
        control,
        name: "creditorQuotesCloneArray"
    })

    const { fields: fieldsCreditor, update: updateCreditor, remove: removeCreditor, insert: insertCreditor } = useFieldArray({
        control,
        name: "creditorQuotesArray"
    })

    function moveToCloneQuotes(index: number) {
        const quote = getValues(`creditorQuotesArray.${index}`)
        const lastQuoteIndex = fieldsCreditorClone.length - 1
        const lastQuoteClone = fieldsCreditorClone[lastQuoteIndex]

        quote.Position = lastQuoteClone.Position + 1
        insertCreditorClone(lastQuoteIndex + 1, quote)
        removeCreditor(index)
        setHighestIndex(lastQuoteIndex + 1)
    }

    function moveToQuotes(index: number) {
        const quote = fieldsCreditorClone[index]
        const quotes = fieldsCreditor

        removeCreditorClone(index)
        insertCreditor(quotes.length, quote)
        setHighestIndex(getValues(`creditorQuotesCloneArray`).length - 1)
    }

    function positionGoUp(index: number, position: number) {
        if (index == lowestIndex.current) {
            return
        }

        const quoteGoUp = getValues(`creditorQuotesCloneArray.${index}`)
        const quoteGoDown = getValues(`creditorQuotesCloneArray.${index - 1}`)
        quoteGoUp.Position = quoteGoDown.Position
        quoteGoDown.Position = position

        updateCreditorClone(index - 1, quoteGoUp)
        updateCreditorClone(index, quoteGoDown)
    }

    function positionGoDown(index: number, position: number) {
        if (index == highestIndex) {
            return
        }

        const quoteGoDown = getValues(`creditorQuotesCloneArray.${index}`)
        const quoteGoUp = getValues(`creditorQuotesCloneArray.${index + 1}`)
        quoteGoDown.Position = quoteGoUp.Position
        quoteGoUp.Position = position

        updateCreditorClone(index + 1, quoteGoDown)
        updateCreditorClone(index, quoteGoUp)
    }

    async function handleCloneQuotes(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        const quotesUpdate: IQuotesCloneUpdateResponse[] = []
        const quotesCreate: IQuotes[] = []

        for (let i = 0; i < data.creditorQuotesCloneArray.length; i++) {
            const quote: IDialogCloneForm = data.creditorQuotesCloneArray[i]

            if (!quote.IsNew) {
                quotesUpdate.push({
                    Id_Phrase: quote.Id_Phrase,
                    Position: quote.Position
                })
            } else {
                quotesCreate.push({
                    Id_Phrase: quote.Id_Phrase,
                    Phrase: quote.Phrase,
                    Phrase_Reference: quote.Phrase_Reference,
                    Position: quote.Position,
                    Status: quote.Status
                })
            }
        }

        const object: { id_creditor: number, quotesUpdate: IQuotesCloneUpdateResponse[], quotesCreate: IQuotes[] } = {
            id_creditor: cloneIdCreditor,
            quotesUpdate,
            quotesCreate
        }

        setDisableAllButtons(true)

        const cloneQuotesResponse = await cloneQuotes(object.id_creditor, object.quotesUpdate, object.quotesCreate)

        if (!cloneQuotesResponse.status) {
            setDisableAllButtons(false)
            toast.error("Houve um erro ao clonar as frases, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        setDisableAllButtons(false)

        toast.success("Frases clonadas com sucesso!", {
            duration: 5000
        })

        handleCloseDialog()
    }

    return (
        <>
            <div className="flex justify-start items-center mt-10">
                <p className="font-bold w-1/2 dark:text-white">Clonar questões para o credor:</p>
                <p className="font-bold w-1/2 dark:text-white">Questões do credor atual:</p>
            </div>
            <div
                className="w-full h-full flex justify-center items-start mt-5 mb-16"
            >
                <div className="relative w-1/2 h-full border-r-[2px] border-gray-100 dark:border-zinc-900 overflow-y-auto">
                    {fieldsCreditorClone.map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                id={`id${item.id}`}
                                className={`flex items-center w-full rounded-md odd:bg-slate-200 even:bg-slate-300 p-4 dark:odd:bg-zinc-700 dark:even:bg-zinc-800 dark:text-white relative mb-1 pr-24`}
                            >
                                {item.Phrase}

                                <button
                                    type="button"
                                    className="absolute bottom-1 right-[66px] bg-emerald-400 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-md px-2 py-1 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition"
                                    disabled={index == lowestIndex.current || disableAllButtons}
                                    onClick={() => positionGoUp(index, item.Position)}
                                >
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </button>

                                <button
                                    type="button"
                                    className="absolute bottom-1 right-9 bg-red-400 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-600 text-white rounded-md px-2 py-1 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition"
                                    disabled={index == highestIndex || disableAllButtons}
                                    onClick={() => positionGoDown(index, item.Position)}
                                >
                                    <FontAwesomeIcon icon={faArrowDown} />
                                </button>

                                {item.IsNew ? (
                                    <>
                                        <button
                                            type="button"
                                            className="absolute bottom-1 right-1 bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md px-2 py-1 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition"
                                            onClick={() => moveToQuotes(index)}
                                            disabled={disableAllButtons || disableAllButtons}
                                        >
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="absolute bottom-1 right-1 bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md px-2 py-1 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition"
                                            disabled={true}
                                        >
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>
                                    </>

                                )}

                            </div>
                        )
                    })}
                </div>
                <div className="relative w-1/2 h-full overflow-y-auto">
                    {fieldsCreditor.map((item, index) => {

                        return (
                            <div
                                key={item.id}
                                id={`id${item.id}`}
                                className={`flex items-center w-full rounded-md odd:bg-slate-200 even:bg-slate-300 p-4 dark:odd:bg-zinc-800 dark:even:bg-zinc-700 dark:text-white relative mb-1 pr-12`}

                            >
                                {item.Phrase}
                                <button
                                    type="button"
                                    className="absolute bottom-1 right-1 bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:dark:bg-gray-500 disabled:cursor-not-allowed transition"
                                    onClick={() => moveToCloneQuotes(index)}
                                    disabled={disableAllButtons}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Button
                type="button"
                text="Fechar"
                styles={`float-right w-[160px] h-10 self-end text-md font-medium p-2 border border-red-400 text-red-500 rounded-md focus:bg-red-400 hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                OnClick={handleCloseDialog}
                disabled={disableAllButtons}
            />

            <Button
                type="submit"
                text="Salvar alterações"
                styles={`float-right w-48 h-10 mr-3 text-md self-end`}
                disabled={disableAllButtons}
                OnClick={handleSubmit(handleCloneQuotes)}
            />
        </>
    )
}
