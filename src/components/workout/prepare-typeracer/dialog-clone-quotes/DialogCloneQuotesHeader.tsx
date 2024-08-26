import { getQuotesByIdCreditor } from "@/api/workout/prepare-typeracer/getQuotesByIdCreditor"
import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { IDialogCloneQuotesHeaderProps } from "@/interfaces/workout/prepare-typeracer/IDialogCloneQuotes"
import { IQuotes } from "@/interfaces/workout/prepare-typeracer/IEditQuotes"
import { ChangeEvent, useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { DialogCloneQuotesForm } from "./DialogCloneQuotesForm"

export function DialogCloneQuotesHeader({ idCreditor, creditors, creditorQuotes, disableAllButtons, setDisableAllButtons, closeDialog }: IDialogCloneQuotesHeaderProps) {

    const [showPhrases, setShowPhrases] = useState(false)
    const [errorCreditor, setErrorCreditor] = useState(false)
    const [cloneIdCreditor, setCloneIdCreditor] = useState(0)
    const [didFilter, setDidFilter] = useState(false)
    const [creditorCloneQuotes, setCreditorCloneQuotes] = useState<IQuotes[]>([])

    const selectCreditor = useRef<HTMLSelectElement>(null)

    function setErrorCreditorTimeout() {
        setErrorCreditor(true)

        setTimeout(() => {
            setErrorCreditor(false)
        }, 3000)
    }

    function removeFilters() {
        setShowPhrases(false)
        setCloneIdCreditor(0)
        setDidFilter(false)

        if (selectCreditor.current) {
            selectCreditor.current.value = "0"
        }
    }

    function handleCloseDialog() {
        removeFilters()
        closeDialog()
    }

    async function handleGetCreditorQuotes() {
        setErrorCreditor(false)

        if (cloneIdCreditor <= 0 || typeof cloneIdCreditor != "number") {
            setErrorCreditorTimeout()

            return
        }

        if (idCreditor == cloneIdCreditor) {
            setErrorCreditorTimeout()
            toast.error("Não é possível clonar frases do mesmo credor!", {
                duration: 5000
            })

            return
        }

        const getCreditorQuotes = await getQuotesByIdCreditor(cloneIdCreditor)

        setDisableAllButtons(true)

        if (!getCreditorQuotes.status) {
            toast.error("Houve um erro ao buscar as frases do credor", {
                duration: 5000
            })

            setDisableAllButtons(false)

            return
        }

        setCreditorCloneQuotes(getCreditorQuotes.data.filter((item: IQuotes) => item.Status == true))
        setDisableAllButtons(false)
        setDidFilter(true)
        setShowPhrases(true)
    }

    return (
        <>
            <h1 className="text-2xl text-center text-slate-500 dark:text-white font-bold">Clonar frases para outro credor</h1>
            <div>
                <div className="flex justify-center items-center w-full mt-5">
                    <FieldForm
                        label="idCreditor"
                        name="Credor"
                        obrigatory={true}
                        error={errorCreditor ? "Inválido" : ""}
                        styles="mr-3 w-fit"
                    >
                        <SelectField
                            name="idCreditor"
                            id="idCreditor"
                            styles={
                                errorCreditor
                                    ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                    : ""
                            }
                            disabled={didFilter || disableAllButtons}
                            OnChange={(event: ChangeEvent<HTMLSelectElement>) => setCloneIdCreditor(Number(event.target.value))}
                            value={cloneIdCreditor}
                            refValue={selectCreditor}
                        >
                            <Option value={"0"} firstValue={"Selecione"} />

                            {creditors.map((creditor, index) => {
                                return (
                                    <Option key={index} value={creditor.Id_Creditor} firstValue={creditor.Creditor} />
                                )
                            })}
                        </SelectField>
                    </FieldForm>

                    <Button
                        type="submit"
                        text="Buscar"
                        styles={`w-24 h-10 mr-3 text-md self-end`}
                        disabled={didFilter || disableAllButtons}
                        OnClick={handleGetCreditorQuotes}
                    />

                    <Button
                        type="button"
                        text="Remover filtros"
                        styles={`w-[160px] h-10 self-end text-md font-medium p-2 border border-red-400 text-red-500 rounded-md focus:bg-red-400 hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                        disabled={!didFilter || disableAllButtons}
                        OnClick={() => removeFilters()}
                    />
                </div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </div>

            {showPhrases ? (
                <DialogCloneQuotesForm
                    cloneIdCreditor={cloneIdCreditor}
                    creditorQuotes={creditorQuotes}
                    creditorCloneQuotes={creditorCloneQuotes}
                    handleCloseDialog={handleCloseDialog}
                    disableAllButtons={disableAllButtons}
                    setDisableAllButtons={setDisableAllButtons}
                />
            ) : (
                <Button
                    type="button"
                    text="Fechar"
                    styles={`fixed bottom-[66px] right-36 w-[160px] h-10 self-end text-md font-medium p-2 border border-red-400 text-red-500 rounded-md focus:bg-red-400 hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                    OnClick={handleCloseDialog}
                />
            )}
        </>
    )
}
