import { verifyUserToken } from "@/api/generics/verifyToken";
import { createCreditorFile, uploadCreditorFile } from "@/api/workout/creditor-content/createCreditorFile";
import { createOperatorFile, uploadOperatorFile } from "@/api/workout/operator-content/createOperatorFile";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { ICreateFileOperatorForm, ICreateFileOperatorSchema, ICreateOperatorContentProps } from "@/interfaces/workout/operator-content/ICreateOperatorContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function CreateOperatorContent({ operators, workoutGetAllPhases }: ICreateOperatorContentProps) {

    const router = useRouter()

    const [isFile, setIsFile] = useState(1)
    const [fileLength, setFileLength] = useState(0)
    const fileList = useRef<HTMLInputElement>(null)
    const [disableButton, setDisableButton] = useState(true)
    const [isSentFile, setIsSentFile] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, resetField, getValues, setValue, setError, reset } = useForm<ICreateFileOperatorForm>({
        defaultValues: {
            title: "",
            phases: "0",
            inputUrl: "",
            file: null,
            idOperator: "0"
        },
        resolver: zodResolver(ICreateFileOperatorSchema)
    })

    useEffect(() => {
        handleDisableButton()
    })

    function openSelect() {
        setIsFile(1)
        resetField("inputUrl")
        setValue("file", null)
    }

    function closeSelect() {
        setIsFile(0)
        setFileLength(0)
        setValue("file", null)
    }

    function verifyFile() {
        if (fileList.current!.files!.length > 0) {
            setFileLength(fileList.current!.files!.length)
            setValue("file", fileList.current!.files![0])
        }
    }

    function handleDisableButton() {
        if (isFile == 1) {
            if (fileLength > 0 && getValues("title").length > 0) {
                setDisableButton(false)

                return
            }

            setDisableButton(true)

            return
        }

        if (getValues("title").length > 0 && getValues("inputUrl").length > 0) {
            setDisableButton(false)

            return
        }

        setDisableButton(true)
    }

    async function handleCreateOperatorFile(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        const file = getValues("file")
        const inputUrl = getValues("inputUrl")

        if (isFile == 1) {
            if (file == null) {
                setError("file", {
                    type: "400"
                })

                return
            }
        } else if (isFile == 0) {
            if (String(inputUrl).trim().length <= 0) {
                setError("inputUrl", {
                    type: "400"
                })

                return
            }
        }

        setIsSentFile(true)

        const workoutFileConfig = {
            title: String(data.title),
            id_phase: Number(data.phases),
            youtube_link: String(inputUrl).trim() == '' ? '' : String(inputUrl).trim(),
            id_operator: Number(data.idOperator)
        }

        const operatorFile = await createOperatorFile<typeof workoutFileConfig>(workoutFileConfig)

        if (!operatorFile.status) {
            setIsSentFile(false)

            toast.error("Houve um erro na criação de um novo arquivo do operador, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        if (String(inputUrl).trim().length > 0) {
            setIsSentFile(false)

            toast.success("Arquivo do operador criado com sucesso!", {
                duration: 5000
            })

            reset()

            return
        }

        const formData = new FormData()
        formData.append("gravacao", file!)

        const fileStatus = await uploadOperatorFile(operatorFile!.data!.id, formData)

        setIsSentFile(false)

        if (!fileStatus) {
            toast.error("Houve um erro ao tentar criar o arquivo no sistema, tente novamente!", {
                duration: 5000
            })

            return
        }

        toast.success("Arquivo do operador criado com sucesso!", {
            duration: 5000
        })

        reset()
    }

    return (
        <form onSubmit={handleSubmit(handleCreateOperatorFile)}>
            <div className="flex justify-center items-center gap-2">
                <FieldForm label="date" name="Título:" obrigatory={true} error={errors.title && "Inválido"}>
                    <input
                        className={twMerge(
                            `mt-1 p-2 border-2 rounded outline-none transition
                            font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                            duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                            dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                            dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                            focus:border-[--focus-input-login] ${errors.title
                                ? "border-[--label-color-error] dark:border-[--label-color-error]"
                                : ""}`
                        )}
                        type="text"
                        id="title"
                        value={watch("title")}
                        {...register("title")}
                        onInput={() => handleDisableButton()}
                    />
                </FieldForm>

                <FieldForm
                    label="operator"
                    name="Operador:"
                    error={errors.idOperator && "Inválido!"}
                >
                    <SelectField
                        name="idOperator"
                        id="operator"
                        styles={`h-11 ` + `${errors.idOperator
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`} required
                        onForm={true}
                        register={register}
                        value={watch("idOperator")}
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {operators.map((operator, index) => {
                            return (
                                <Option key={index} value={operator.Id_User} firstValue={`${operator.Name} ${operator.Last_Name}`} />
                            )
                        })}
                        
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="phases"
                    name="Fase:"
                    error={errors.phases && "Inválido"}
                >
                    <SelectField
                        name="phases"
                        id="workoutPhases"
                        styles={`h-11 ${errors.phases
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""}`
                        }
                        required
                        onForm={true}
                        register={register}
                        value={watch("phases")}
                    >
                        <Option value={0} firstValue={"Selecione"} />

                        {workoutGetAllPhases.map((item, index) => {

                            if (index == 5) {
                                return
                            }

                            return (
                                <Option key={index} value={item.Id_Phase} firstValue={item.Phase} />
                            )
                        })}

                    </SelectField>
                </FieldForm>
            </div>

            <div className="flex flex-row gap-2 items-center mt-3">
                <button
                    type="button"
                    className={isFile == 1
                        ? `w-4 h-4 rounded-full border-[1px] border-blue-500 flex justify-center items-center`
                        : `w-4 h-4 border-gray-500 border-[1px] rounded-full`}
                    name="fileInput"
                    value="1"
                    onClick={() => openSelect()}
                >
                    <div
                        className={isFile == 1
                            ? "w-[10px] h-[10px] bg-blue-500 rounded-full"
                            : ""
                        }
                    />
                </button>

                <p>Arquivo</p>

                <button
                    type="button"
                    className={isFile == 0
                        ? "w-4 h-4 rounded-full border-[1px] border-blue-500 flex justify-center items-center"
                        : "w-4 h-4 border-gray-500 border-[1px] rounded-full"}
                    name="urlInput"
                    value="0"
                    onClick={() => closeSelect()}
                >
                    <div
                        className={isFile == 0
                            ? "w-[10px] h-[10px] bg-blue-500 rounded-full"
                            : ""
                        }
                    />
                </button>

                <p>URL de vídeo do YouTube</p>
            </div>
            <div className="flex justify-between items-center">
                {isFile == 1 ? (
                    <input
                        ref={fileList}
                        type="file"
                        name="file"
                        id="fileInput"
                        className={`w-fit my-14 border-[1px] rounded
                            ${errors.file ? "border-red-500" : ""}
                        `}
                        onChange={() => verifyFile()}
                    />
                ) : (
                    <FieldForm
                        label="date"
                        name="URL do vídeo:"
                        obrigatory={true}
                        error={errors.inputUrl && "Inválido"}
                        styles="w-fit my-8"
                    >
                        <input
                            className={twMerge(
                                `mt-6 p-2 border-2 rounded outline-none transition
                                font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                                duration-200 w-fit placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                                dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                                dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                                focus:border-[--focus-input-login] ${errors.inputUrl ? "border-red-500" : ""}`,
                            )}
                            type="text"
                            id="inputURL"
                            value={watch("inputUrl")}
                            {...register("inputUrl")}
                        />
                    </FieldForm>
                )}
                <div className="flex flex-row gap-2 items-center">
                    <Button
                        text="Salvar o arquivo"
                        styles={`w-60 text-md`}
                        disabled={disableButton || isSentFile}
                    />
                </div>
            </div>
        </form>
    )
}