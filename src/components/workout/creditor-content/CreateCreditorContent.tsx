import { createCreditorFile, uploadCreditorFile } from "@/api/workout/creditor-content/createCreditorFile";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { ICreateCreditorContentProps, ICreateFileCreditorForm, ICreateFileCreditorSchema } from "@/interfaces/workout/creditor-content/ICreateCreditorContent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function CreateCreditorContent({ Creditors, WorkoutAllPhases }: ICreateCreditorContentProps) {

    const [isFile, setIsFile] = useState(1)
    const [fileLength, setFileLength] = useState(0)
    const fileList = useRef<HTMLInputElement>(null)
    const [disableButton, setDisableButton] = useState(true)
    const [isSentFile, setIsSentFile] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, resetField, getValues, setValue, setError, reset } = useForm<ICreateFileCreditorForm>({
        defaultValues: {
            title: "",
            phases: "0",
            inputUrl: "",
            file: null,
            idCreditor: "0"
        },
        resolver: zodResolver(ICreateFileCreditorSchema)
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

    async function handleCreateCreditorFile(data: FieldValues) {
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
            id_creditor: Number(data.idCreditor)
        }

        const creditorFile = await createCreditorFile<typeof workoutFileConfig>(workoutFileConfig)

        if (!creditorFile.status) {
            setIsSentFile(false)

            toast.error("Houve um erro na criação de um novo arquivo global, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        if (String(inputUrl).trim().length > 0) {
            setIsSentFile(false)

            toast.success("Arquivo global criado com sucesso!", {
                duration: 5000
            })

            reset()

            return
        }

        const formData = new FormData()
        formData.append("gravacao", file!)

        if (Number(data.phases) == 0) {
            const fileStatus = await uploadCreditorFile(
                creditorFile!.data!.id,
                formData
            )

            setIsSentFile(false)

            if (!fileStatus) {
                toast.error("Houve um erro ao tentar criar o arquivo no sistema, tente novamente!", {
                    duration: 5000
                })

                return
            }

            toast.success("Arquivo global criado com sucesso!", {
                duration: 5000
            })

            reset()

            return
        }

        const fileStatus = await uploadCreditorFile(creditorFile!.data!.id, formData)

        setIsSentFile(false)

        if (!fileStatus) {
            toast.error("Houve um erro ao tentar criar o arquivo no sistema, tente novamente!", {
                duration: 5000
            })

            return
        }

        toast.success("Arquivo global criado com sucesso!")

        reset()
    }

    return (
        <form onSubmit={handleSubmit(handleCreateCreditorFile)}>
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
                    label="creditor"
                    name="Credor:"
                    error={errors.idCreditor && "Inválido!"}
                >
                    <SelectField
                        name="idCreditor"
                        id="creditor"
                        styles={`h-11 ` + `${errors.idCreditor
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`} required
                        onForm={true}
                        register={register}
                        value={watch("idCreditor")}
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {Creditors.map((creditor, index) => {
                            return (
                                <Option key={index} value={creditor.Id_Creditor} firstValue={creditor.Creditor} />
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

                        {WorkoutAllPhases.map((item, index) => {

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