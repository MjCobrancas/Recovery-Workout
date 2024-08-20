import { verifyUserToken } from "@/api/generics/verifyToken";
import { getGlobalFiles } from "@/api/workout/global-content/getGlobalFiles";
import { removeGlobalFiles } from "@/api/workout/global-content/removeGlobalFiles";
import { removeInitialGlobalFiles } from "@/api/workout/global-content/removeInitialGlobalFiles";
import { updateGlobalFiles } from "@/api/workout/global-content/updateGlobalFiles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IEditGlobalFilesForm, IEditGlobalFilesProps, IEditGlobalFilesSchema, IObjectBackendRequest } from "@/interfaces/workout/global-content/IEditGlobalFiles";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function EditGlobalContent({ globalAllFiles, WorkoutAllPhases, setGlobalFiles }: IEditGlobalFilesProps) {

    const router = useRouter()

    const [disableButton, setDisableButton] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<{ globalFiles: IEditGlobalFilesForm[] }>({
        defaultValues: {
            globalFiles: useMemo(() => {
                const mergeArrays = [...globalAllFiles.initialGlobalFiles, ...globalAllFiles.globalFiles]
                return mergeArrays.map((item) => {
                    return {
                        FileExtension: item.FileExtension,
                        Id_Global_File: String(item.Id_Global_File),
                        Id_Phase: item.Id_Phase ? String(item.Id_Phase) : "0",
                        Title: item.Title,
                        Status: true
                    }
                })
            }, [globalAllFiles])
        },
        resolver: zodResolver(IEditGlobalFilesSchema)
    })

    useEffect(() => {
        const globalFilesData: IEditGlobalFilesForm[] = []
        if (globalAllFiles == null) {
            return
        }

        const mergeArrays = [...globalAllFiles.initialGlobalFiles, ...globalAllFiles.globalFiles]
        mergeArrays.map((item) => {
            globalFilesData.push({
                FileExtension: item.FileExtension,
                Id_Global_File: String(item.Id_Global_File),
                Id_Phase: item.Id_Phase ? String(item.Id_Phase) : "0",
                Title: item.Title,
                Status: true
            })
        })

        reset({ globalFiles: globalFilesData })

    }, [globalAllFiles, reset])

    const { fields, update } = useFieldArray({
        control,
        name: "globalFiles"
    })

    function handleChangeFileStatus(index: number) {
        const object = fields[index]
        object.Status = !object.Status
        update(index, object)
    }

    async function handleEditGlobalFiles(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)
        let statusError = false

        const objectBackEnd: IObjectBackendRequest = {
            globalFiles: [],
            initialGlobalFiles: []
        }

        for (let i = 0; i < data.globalFiles.length; i++) {
            const item = data.globalFiles[i]

            if (item.Id_Phase == '0') {
                objectBackEnd.initialGlobalFiles.push({
                    id_global_file: Number(item.Id_Global_File),
                    title: String(item.Title),
                    status: item.Status
                })

                if (!item.Status && item.FileExtension != null && !statusError) {
                    const removeInitialGlobalFile = await removeInitialGlobalFiles(Number(item.Id_Global_File))

                    if (!removeInitialGlobalFile.status) {
                        statusError = true
                    }
                }
            } else {
                objectBackEnd.globalFiles.push({
                    id_global_file: Number(item.Id_Global_File),
                    id_phase: Number(item.Id_Phase),
                    title: String(item.Title),
                    status: item.Status
                })

                if (!item.Status && item.FileExtension != null && !statusError) {
                    const removeGlobalFile = await removeGlobalFiles(Number(item.Id_Global_File))

                    if (!removeGlobalFile.status) {
                        statusError = true
                    }
                }
            }

        }

        if (statusError) {
            setDisableButton(false)
            toast.error("Houve um problema de remover o arquivo no servidor da VPS, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        const response = await updateGlobalFiles(objectBackEnd)

        setDisableButton(false)

        if (!response.status) {
            toast.error("Houve um erro na atualização dos arquivos no banco de dados, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        toast.success("Arquivos atualizados com sucesso!", {
            duration: 5000
        })

        const globalFiles = await getGlobalFiles()

        if (globalFiles.status) {
            setGlobalFiles(globalFiles.data)
        }

    }

    return (
        <form onSubmit={handleSubmit(handleEditGlobalFiles)}>
            <div className="flex justify-center items-center mt-5">
                <div className="w-[900px] flex flex-col justify-center items-center p-4 gap-2 border-[2px] border-slate-300 rounded-md">
                    <h2 className="text-center text-2xl font-medium mt-5">Arquivos globais</h2>

                    {fields.length > 0 ? (
                        <table className="w-full mt-5">
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
                                                    id={`id_file${item.Id_Global_File}`}
                                                    name={`globalFiles.${index}.Title`}
                                                    type="input"
                                                    placeholder="Digite o título do arquivo"
                                                    value={watch(`globalFiles.${index}.Title`)}
                                                    disabled={disableButton}
                                                    styles={errors.globalFiles && errors.globalFiles[index]?.Title ? "border-red-400" : ""}
                                                    onForm={true}
                                                    register={register}
                                                />
                                            </td>
                                            <td className="p-2 h-5 text-center">
                                                <SelectField
                                                    name={`globalFiles.${index}.Id_Phase`}
                                                    id={`workoutPhases2${item.Id_Global_File}`}
                                                    styles={`h-11 font-bold ${errors.globalFiles && errors.globalFiles[index]?.Id_Phase
                                                        ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                                        : ""
                                                        }`
                                                    }
                                                    required
                                                    onForm={item.Id_Phase == '0' ? false : true}
                                                    register={register}
                                                    value={watch(`globalFiles.${index}.Id_Phase`)}
                                                    disabled={disableButton || item.Id_Phase == "0"}
                                                >
                                                    {item.Id_Phase == '0' ? (
                                                        <Option
                                                            firstValue={"Treinamento Inicial"}
                                                            value={item.Id_Phase}
                                                            selectedValue={item.Id_Phase}
                                                            styles="sr-only"
                                                        />
                                                    ) : (
                                                        WorkoutAllPhases.map((phase, index) => {
                                                            return (
                                                                <Option key={index} value={phase.Id_Phase} firstValue={phase.Phase} selectedValue={item.Id_Phase} />
                                                            )
                                                        })
                                                    )}

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
                                                    disabled={false}
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
                    ) : (
                        <div className={"text-red-600"}>No momento, não há arquivos globais criados.</div>
                    )}
                    <Button
                        type="submit"
                        name="globalFiles"
                        text="Salvar Alterações"
                        styles={`w-30 h-11 mt-8 text-md self-end`}
                        disabled={disableButton}
                    />
                </div>
            </div>
        </form>
    )
}