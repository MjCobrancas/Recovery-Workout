import { verifyUserToken } from "@/api/generics/verifyToken";
import { getOperatorFilesList } from "@/api/workout/operator-content/getOperatorFiles";
import { removeOperatorFile } from "@/api/workout/operator-content/removeOperatorFile";
import { updateOperatorFiles } from "@/api/workout/operator-content/updateOperatorFile";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IEditOperatorContentProps, IOperatorFilesForm, IOperatorFilesObject, IOperatorFilesSchema } from "@/interfaces/workout/operator-content/IEditOperatorContent";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function EditOperatorContent({ operators, workoutGetAllPhases, setValueDisableAllButtons, disableAllButtons, setValueOperatorFiles }: IEditOperatorContentProps) {

    const router = useRouter()

    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<{ operatorFiles: IOperatorFilesForm[] }>({
        defaultValues: {
            operatorFiles: useMemo(() => {
                return operators.map((item) => {
                    return {
                        FileExtension: item.FileExtension,
                        Id_File_Operator: String(item.Id_File_Operator),
                        Id_Operator: String(item.Id_Operator),
                        Id_Phase: String(item.Id_Phase),
                        Title: item.Title,
                        Status: true
                    }
                })
            }, [operators])
        },
        resolver: zodResolver(IOperatorFilesSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "operatorFiles"
    })

    useEffect(() => {
        const operatorFilesData: IOperatorFilesForm[] = []
        if (operators == null) {
            return
        }

        operators.map((item) => {
            operatorFilesData.push({
                FileExtension: item.FileExtension,
                Id_File_Operator: String(item.Id_File_Operator),
                Id_Operator: String(item.Id_Operator),
                Id_Phase: String(item.Id_Phase),
                Title: item.Title,
                Status: true
            })
        })

        reset({ operatorFiles: operatorFilesData })

    }, [operators, reset])

    function handleChangeFileStatus(index: number) {
        const object = fields[index]
        object.Status = !object.Status

        update(index, object)
    }

    async function handleUpdateOperatorFiles(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        let statusError = false
        setValueDisableAllButtons(true)

        const object: IOperatorFilesObject = {
            id_user: operators[0].Id_Operator,
            operatorFiles: []
        }

        for (let i = 0; i < data.operatorFiles.length; i++) {
            const item = data.operatorFiles[i]

            object.operatorFiles.push({
                id_file_operator: Number(item.Id_File_Operator),
                id_phase: Number(item.Id_Phase),
                title: item.Title,
                status: item.Status
            })

            if (!item.Status && item.FileExtension != null) {
                const removeOperatorFileStatus = await removeOperatorFile(item.Id_File_Operator)

                if (!removeOperatorFileStatus.status) {
                    statusError = true
                }
            }
        }

        if (statusError) {
            setValueDisableAllButtons(false)
            toast.error("Houve um problema de remover o arquivo no servidor da VPS, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        const responseCreditorFiles = await updateOperatorFiles(object)

        setValueDisableAllButtons(false)

        if (!responseCreditorFiles.status) {
            toast.error("Houve um erro na edição dos arquivos do operador, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        toast.success("Arquivos editados com sucesso!", {
            duration: 5000
        })

        const getFiles = await getOperatorFilesList(operators[0].Id_Operator)

        if (getFiles.status) {
            setValueOperatorFiles(getFiles.data != null ? getFiles.data : [])
        }

    }

    console.log(errors)

    return (
        <form className="w-full mt-10 flex flex-col" onSubmit={handleSubmit(handleUpdateOperatorFiles)}>
            <table className="w-full">
                <thead className="w-full bg-gray-200 dark:bg-slate-600">
                    <tr>
                        <th className="pl-6 text-left w-2/4 font-semibold p-2 dark:text-white/80 rounded-tl-md">Título do arquivo</th>
                        <th className="pl-4 text-left font-semibold p-2 dark:text-white/80">Fase</th>
                        <th className="text-center font-semibold p-2 dark:text-white/80 rounded-tr-md">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((item, index) => {
                        return (
                            <tr key={item.id} className="h-fit odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-500 dark:even:bg-slate-600">
                                <td className="h-fit p-2 text-center">
                                    <Input
                                        id={`operatorFiles.${index}.Title`}
                                        name={`operatorFiles.${index}.Title`}
                                        type="input"
                                        placeholder="Digite o título do arquivo"
                                        disabled={disableAllButtons}
                                        styles={errors.operatorFiles && errors.operatorFiles[index]?.Title ? "border-red-400" : ""}
                                        onForm={true}
                                        register={register}
                                        value={watch(`operatorFiles.${index}.Title`)}
                                    />
                                </td>
                                <td className="p-2 h-5 text-center">
                                    <SelectField
                                        name={`operatorFiles.${index}.Id_Phase`}
                                        id={`workoutPhases${item.Id_File_Operator}`}
                                        styles={`h-11 font-bold ${errors.operatorFiles && errors.operatorFiles[index]?.Id_Phase
                                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                            : ""}
                                        }`}
                                        required
                                        disabled={disableAllButtons}
                                        onForm={true}
                                        register={register}
                                        value={watch(`operatorFiles.${index}.Id_Phase`)}
                                    >
                                        {workoutGetAllPhases.map((phase, index) => {
                                            if (index == 5) {
                                                return
                                            }

                                            return (
                                                <Option key={index} value={phase.Id_Phase} firstValue={phase.Phase} selectedValue={item.Id_Phase} />
                                            )
                                        })}
                                    </SelectField>
                                </td>
                                <td className="p-2 text-center">
                                    <button
                                        type="button"
                                        onClick={() => handleChangeFileStatus(index)}
                                        className={` px-2 py-1 duration-200 rounded-md hover:text-white w-fit disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:text-black ${item.Status
                                            ? ` bg-green-400 hover:bg-green-500`
                                            : `bg-red-400 hover:bg-red-500 px-[9px]`
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
                name="creditorFiles"
                text="Salvar Alterações"
                styles={`w-30 h-11 mt-8 text-md self-end`}
                disabled={disableAllButtons}
            />
        </form>
    )
}