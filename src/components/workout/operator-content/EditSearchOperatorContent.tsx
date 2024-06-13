import { getCreditorFilesList } from "@/api/workout/creditor-content/getCreditorFiles";
import { getOperatorFilesList } from "@/api/workout/operator-content/getOperatorFiles";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { ICreditorFilesList, IEditSearchCreditorContentProps } from "@/interfaces/workout/creditor-content/IEditCreditorContent";
import { IEditSearchOperatorContentProps, IOperatorFilesList } from "@/interfaces/workout/operator-content/IEditOperatorContent";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { EditOperatorContent } from "./EditOperatorContent";

export function EditSearchOperatorContent({ operators, workoutGetAllPhases }: IEditSearchOperatorContentProps) {

    const [disableButton, setDisableButton] = useState(false)
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [didFilter, setDidFilter] = useState(false)
    const [idOperator, setIdOperator] = useState('0')
    const [error, setError] = useState("")
    const [operatorFiles, setOperatorFiles] = useState<IOperatorFilesList[]>([])
    const selectField = useRef<HTMLSelectElement>(null)

    function setValueOperatorFiles(value: IOperatorFilesList[]) {
        setOperatorFiles(value)
    }

    function setValueDisableAllButtons(value: boolean) {
        setDisableAllButtons(value)
    }

    async function handleGetOperatorFiles(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setDisableButton(true)

        if (String(Number(idOperator)) == "NaN") {
            setError("operator")
            setDisableButton(false)

            return
        }

        if (Number(idOperator) <= 0) {
            setError("operator")
            setDisableButton(false)

            return
        }

        setError("")
        const operatorFilesData: IResultDefaultResponse<IOperatorFilesList[] | null> = await getOperatorFilesList(Number(idOperator))

        if (!operatorFilesData.status) {
            toast.error("Houve um erro em buscar os arquivos do operador, revise os valores e tente novamente!", {
                duration: 5000
            })

            setDisableButton(false)

            return
        }

        setDidFilter(true)

        setOperatorFiles(operatorFilesData.data != null ? operatorFilesData.data : [])
    }

    function removeFilter() {
        setDisableButton(false)
        setDidFilter(false)
        setOperatorFiles([])
        setIdOperator("0")
        selectField.current!.value = "0"
    }

    return (
        <div className="flex justify-center items-center mt-5">
            <div className="w-[900px] flex flex-col justify-center items-center p-4 gap-2 border-[2px] border-slate-300 rounded-md">
                <form className="flex justify-center items-center gap-2" onSubmit={(event: FormEvent<HTMLFormElement>) => handleGetOperatorFiles(event)}>
                    <FieldForm
                        label="operator"
                        name="Operador:"
                        error={error == "operator" ? "Inválido!" : ""}
                        styles="w-fit"
                    >
                        <SelectField
                            refValue={selectField}
                            name="operator"
                            id="operator"
                            styles={`h-11 w-fit ` + `${String(error) == `operator`
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""
                                }`}
                            required
                            disabled={disableButton || didFilter || disableAllButtons}
                            OnChange={(event: ChangeEvent<HTMLSelectElement>) => setIdOperator(event.target.value)}
                        >
                            <Option value={"0"} firstValue={"Selecione"} />

                            {operators.map((operator, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={operator.Id_User}
                                        firstValue={`${operator.Name} ${operator.Last_Name}`}
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

                {operatorFiles.length == 0 && didFilter && (
                    <div className={"text-red-600"}>Este operador ainda não possui arquivos cadastrados.</div>
                )}

                {operatorFiles.length > 0 && (
                    <EditOperatorContent 
                        operators={operatorFiles} 
                        workoutGetAllPhases={workoutGetAllPhases} 
                        disableAllButtons={disableAllButtons}
                        setValueDisableAllButtons={setValueDisableAllButtons}
                        setValueOperatorFiles={setValueOperatorFiles}
                    />
                )}

            </div>

        </div>
    )

}