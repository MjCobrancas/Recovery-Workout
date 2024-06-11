import { getCreditorFilesList } from "@/api/workout/creditor-content/getCreditorFiles";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { ICreditorFilesList, IEditSearchCreditorContentProps } from "@/interfaces/workout/creditor-content/IEditCreditorContent";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { EditCreditorContent } from "./EditCreditorContent";

export function EditSearchCreditorContent({ Creditors, WorkoutGetAllPhases }: IEditSearchCreditorContentProps) {

    const [disableButton, setDisableButton] = useState(false)
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [didFilter, setDidFilter] = useState(false)
    const [idCreditor, setIdCreditor] = useState('0')
    const [error, setError] = useState("")
    const [creditorFiles, setCreditorFiles] = useState<ICreditorFilesList[]>([])
    const selectField = useRef<HTMLSelectElement>(null)

    function setValueCreditorFiles(value: ICreditorFilesList[]) {
        setCreditorFiles(value)
    }

    function setValueDisableAllButtons(value: boolean) {
        setDisableAllButtons(value)
    }

    async function handleGetCreditorFiles(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setDisableButton(true)

        if (String(Number(idCreditor)) == "NaN") {
            setError("creditor")
            setDisableButton(false)

            return
        }

        if (Number(idCreditor) <= 0) {
            setError("creditor")
            setDisableButton(false)

            return
        }

        setError("")
        const creditorFilesData: IResultDefaultResponse<ICreditorFilesList[] | null> = await getCreditorFilesList(Number(idCreditor))

        if (!creditorFilesData.status) {
            toast.error("Houve um erro em buscar os arquivos do credor, revise os valores e tente novamente!", {
                duration: 5000
            })

            setDisableButton(false)

            return
        }

        setDidFilter(true)

        setCreditorFiles(creditorFilesData.data != null ? creditorFilesData.data : [])
    }

    function removeFilter() {
        setDisableButton(false)
        setDidFilter(false)
        setCreditorFiles([])
        setIdCreditor("0")
        selectField.current!.value = "0"
    }

    return (
        <div className="flex justify-center items-center mt-5">
            <div className="w-[900px] flex flex-col justify-center items-center p-4 gap-2 border-[2px] border-slate-300 rounded-md">
                <form className="flex justify-center items-center gap-2" onSubmit={(event: FormEvent<HTMLFormElement>) => handleGetCreditorFiles(event)}>
                    <FieldForm
                        label="creditor"
                        name="Credor:"
                        error={error == "creditor" ? "Inválido!" : ""}
                        styles="w-fit"
                    >
                        <SelectField
                            refValue={selectField}
                            name="creditor"
                            id="creditor"
                            styles={`h-11 w-fit ` + `${String(error) == `creditor`
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                                }`}
                            required
                            disabled={disableButton || didFilter || disableAllButtons}
                            OnChange={(event: ChangeEvent<HTMLSelectElement>) => setIdCreditor(event.target.value)}
                        >
                            <Option value={"0"} firstValue={"Selecione"} />

                            {Creditors.map((creditor, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={creditor.Id_Creditor}
                                        firstValue={creditor.Creditor}
                                    />
                                )
                            })}
                        </SelectField>
                    </FieldForm>
                    <Button
                        text="Buscar"
                        name="submitButton"
                        styles={`w-30 text-md p-2 self-end`}
                        disabled={disableButton || didFilter || disableAllButtons}
                    />

                    <Button
                        type="reset"
                        text="Remover filtros"
                        styles={`w-30 self-end text-md font-medium p-2 border border-red-400 text-red-500 rounded-md hover:bg-red-400 hover:text-white focus:bg-red-400 duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                        disabled={!didFilter}
                        OnClick={() => removeFilter()}
                    />
                </form>

                {creditorFiles.length == 0 && didFilter && (
                    <div className={"text-red-600"}>Este credor ainda não possui arquivos cadastrados.</div>
                )}

                {creditorFiles.length > 0 && (
                    <EditCreditorContent 
                        Creditors={creditorFiles} 
                        WorkoutGetAllPhases={WorkoutGetAllPhases} 
                        setValueDisableAllButtons={setValueDisableAllButtons}
                        disableAllButtons={disableAllButtons}
                        setValueCreditorFiles={setValueCreditorFiles}
                    />
                )}

            </div>

        </div>
    )

}