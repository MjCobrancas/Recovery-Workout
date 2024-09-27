import { verifyUserToken } from "@/api/generics/verifyToken";
import { getCreditorFilesList } from "@/api/workout/creditor-content/getCreditorFiles";
import { removeCreditorFile } from "@/api/workout/creditor-content/removeCreditorFile";
import { updateCreditorFiles } from "@/api/workout/creditor-content/updateCreditorFiles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { ICreditorFilesForm, ICreditorFilesObject, ICreditorFilesSchema, IEditCreditorContentProps } from "@/interfaces/workout/creditor-content/IEditCreditorContent";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function EditCreditorContent({ Creditors, WorkoutGetAllPhases, setValueDisableAllButtons, disableAllButtons, setValueCreditorFiles }: IEditCreditorContentProps) {

    const router = useRouter()

    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<{ creditorFiles: ICreditorFilesForm[] }>({
        defaultValues: {
            creditorFiles: useMemo(() => {
                return Creditors.map((item) => {
                    return {
                        FileExtension: item.FileExtension,
                        Id_File_Creditor: String(item.Id_File_Creditor),
                        Id_Creditor: String(item.Id_Creditor),
                        Id_Phase: String(item.Id_Phase),
                        Title: item.Title,
                        Status: true
                    }
                })
            }, [Creditors])
        },
        resolver: zodResolver(ICreditorFilesSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "creditorFiles"
    })

    useEffect(() => {
        const creditorFilesData: ICreditorFilesForm[] = []
        if (Creditors == null) {
            return
        }

        Creditors.map((item) => {
            creditorFilesData.push({
                FileExtension: item.FileExtension,
                Id_File_Creditor: String(item.Id_File_Creditor),
                Id_Creditor: String(item.Id_Creditor),
                Id_Phase: String(item.Id_Phase),
                Title: item.Title,
                Status: true
            })
        })

        reset({ creditorFiles: creditorFilesData })

    }, [Creditors, reset])

    function handleChangeFileStatus(index: number) {
        const object = fields[index]
        object.Status = !object.Status

        update(index, object)
    }

    async function handleUpdateCreditorFiles(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        let statusError = false
        setValueDisableAllButtons(true)

        const object: ICreditorFilesObject = {
            id_creditor: Creditors[0].Id_Creditor,
            creditorFiles: []
        }

        for (let i = 0; i < data.creditorFiles.length; i++) {
            const item = data.creditorFiles[i]

            object.creditorFiles.push({
                id_file_creditor: Number(item.Id_File_Creditor),
                id_phase: Number(item.Id_Phase),
                title: item.Title,
                status: item.Status
            })

            if (!item.Status && item.FileExtension != null) {
                const removeCreditorFileStatus = await removeCreditorFile(item.Id_File_Creditor)

                if (!removeCreditorFileStatus.status) {
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

        const responseCreditorFiles = await updateCreditorFiles(object)

        setValueDisableAllButtons(false)

        if (!responseCreditorFiles.status) {
            toast.error("Houve um erro na edição dos arquivos do Credor, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        toast.success("Arquivos editados com sucesso!", {
            duration: 5000
        })

        const getFiles = await getCreditorFilesList(Creditors[0].Id_Creditor)

        if (getFiles.status) {
            setValueCreditorFiles(getFiles.data != null ? getFiles.data : [])
        }

    }

    return (
        <form className="w-full mt-10 flex flex-col" onSubmit={handleSubmit(handleUpdateCreditorFiles)}>
            <table className="w-full">
                <thead className="w-full bg-gray-200 dark:bg-zinc-900">
                    <tr>
                        <th className="pl-6 text-left w-2/4 font-semibold p-2 dark:text-white/80 rounded-tl-md">Título do arquivo</th>
                        <th className="pl-4 text-left font-semibold p-2 dark:text-white/80">Fase</th>
                        <th className="text-center font-semibold p-2 dark:text-white/80 rounded-tr-md">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((item, index) => {
                        return (
                            <tr key={item.id} className="h-fit odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800">
                                <td className="h-fit p-2 text-center">
                                    <Input
                                        id={`creditorFiles.${index}.Title`}
                                        name={`creditorFiles.${index}.Title`}
                                        type="input"
                                        placeholder="Digite o título do arquivo"
                                        disabled={disableAllButtons}
                                        styles={errors.creditorFiles && errors.creditorFiles[index]?.Title ? "border-red-400" : ""}
                                        onForm={true}
                                        register={register}
                                        value={watch(`creditorFiles.${index}.Title`)}
                                    />
                                </td>
                                <td className="p-2 h-5 text-center">
                                    <SelectField
                                        name={`creditorFiles.${index}.Id_Phase`}
                                        id={`workoutPhases${item.Id_File_Creditor}`}
                                        styles={`h-11 font-bold ${errors.creditorFiles && errors.creditorFiles[index]?.Id_Phase
                                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                            : ""}
                                        }`}
                                        required
                                        disabled={disableAllButtons}
                                        onForm={true}
                                        register={register}
                                        value={watch(`creditorFiles.${index}.Id_Phase`)}
                                    >
                                        {WorkoutGetAllPhases.map((phase, index) => {
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