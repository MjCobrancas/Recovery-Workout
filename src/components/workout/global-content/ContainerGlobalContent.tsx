'use client'

import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Input } from "@/components/Input"
import { Option } from "@/components/Option"
import { PaperBlock } from "@/components/PaperBlock"
import { SelectField } from "@/components/SelectField"
import { TextPrincipal } from "@/components/TextPrincipal"
import { IWorkoutGlobalContent, globalContentData, globalContentSchema } from "@/interfaces/workout/global-content/GlobalContent"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

export default function ContainerGlobalContent({ WorkoutAllPhases }: IWorkoutGlobalContent) {

    const filename = useRef<HTMLInputElement>(null)
    const inputUrlRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)

    const { register, handleSubmit, watch, formState: { errors }, resetField } = useForm<globalContentData>({
        resolver: zodResolver(globalContentSchema),
        defaultValues: {
            workoutURL: ""
        }
    })

    /* Fazer uma interface ou um state? */
    let files: any
    let editFiles: any[] = []
    let error: string = ""
    /* Fim da questão. */

    const [principalText, setPrincipalText] = useState<string>("Enviar Arquivos Globais")
    const [successUploadGlobalContent, setSuccessUploadGlobalContent] = useState(false)
    const [failureUploadGlobalContent, setFailureUploadGlobalContent] = useState(false)
    const [titleLength, setTitleLength] = useState(0)
    const [urlLength, setUrlLength] = useState(0)
    const [isFile, setIsFile] = useState(1)
    const [input, setInput] = useState("")
    const [inputURL, setInputURL] = useState("")
    const [isSentFile, setIsSentFile] = useState(true)
    const [isMessagesSuccess, setIsMessagesSuccess] = useState(false)
    const [isLoadingEditGlobalFile, setIsLoadingEditGlobalFile] = useState(false)
    const [isLoadingEditFiles, setIsLoadingEditFiles] = useState(false)
    const [urlEnabled, setUrlEnabled] = useState(false)
    const [filesEnabled, setFilesEnabled] = useState(true)
    const [finishedUploadFile, setFinishedUploadFile] = useState(false)
    const [disableButton, setDisableButton] = useState(false)


    function verifyTitleLength() {
        setTitleLength(input.length)
    }

    function verifyUrlLength() {
        setUrlLength(inputURL.length)

        if (inputURL.length > 0) {
            setUrlEnabled(false)
        } else {
            setUrlEnabled(true)
        }
    }

    function verifyFile() {
        if (isFile == 0) {
            setFilesEnabled(false)
            return
        }

        if (files.length == 0) {
            setFilesEnabled(true)
        } else {
            setFilesEnabled(false)
        }
    }

    function openSelect() {
        setUrlEnabled(false)
        setFilesEnabled(true)
        setInputURL("")
        setIsFile(1)
    }

    function closeSelect() {
        setUrlEnabled(true)
        setFilesEnabled(false)
        setIsFile(0)
    }

    function handleNavigateButtons() {
        setTimeout(() => {
            setIsSentFile(!isSentFile)

            setPrincipalText(principalText == "Enviar Arquivos Globais" ? "Editar Arquivos Globais" : "Enviar Arquivos Globais")
            editFiles = []
            setIsLoadingEditFiles(false)

            if (!isSentFile) {
                setIsLoadingEditGlobalFile(true)
            } else {
                setIsLoadingEditGlobalFile(false)
            }

            if (isFile == 1) {
                setFilesEnabled(true)
                setUrlEnabled(false)
            } else {
                setUrlEnabled(true)
                setFilesEnabled(false)

                if (isSentFile) {
                    setTimeout(() => {
                        inputUrlRef!.current!.value = ""
                        resetField("workoutURL")
                    }, 50);

                    setInputURL("")
                }
            }

            if (isSentFile) {
                setTimeout(() => {
                    titleRef!.current!.value = ""
                }, 50);

                setInput("")
            }
        }, 50);
    }

    function handleSubmitInitialForm() {
        setTimeout(() => {
            setDisableButton(true)
            setIsLoadingEditFiles(true)
            error = ""
        }, 50);
    }

    return (
        <PaperBlock>
            <TextPrincipal text={principalText} styles={`max-md:text-[2rem]`} />

            <div className={`text-center`}>
                <span className={`font-medium`}>
                    Navegar pelas abas:
                </span>
            </div>

            <div className={`flex justify-center items-center gap-2`}>
                <Button
                    styles={`w-fit p-2`}
                    type="button"
                    text="Enviar conteúdo global"
                    disabled={isSentFile}
                    OnClick={() => handleNavigateButtons()}
                />

                <form
                /* action="?/getGlobalFiles"
                    enctype="multipart/form-data"
                    method="POST"
                    class={``}
                    use:enhance={() => {
                        return async ({ update, result }) => {

                        console.log(result)
                        setTimeout(() => {
                            isLoadingEditGlobalFile = false
                        }, 1000);

                        editFiles = result.data.data || []

                        if (editFiles.globalFiles.length <= 0 || editFiles.initialGlobalFiles.length <= 0) {
                            loadingCreditorFiles = false
                        } else {
                            for (let i = 0; i < editFiles.globalFiles.length; i++) {
                            editFiles.globalFiles[i].Status = true
                            editFiles.globalFiles[i].Id_Phase_New = editFiles.globalFiles[i].Id_Phase
                            }

                            for (let i = 0; i < editFiles.initialGlobalFiles.length; i++) {
                            editFiles.initialGlobalFiles[i].Status = true
                            }
                        }

                        console.log(editFiles)
                        }
                    }} */
                >
                    <Button
                        styles={`w-fit p-2`}
                        type="submit"
                        text="Editar conteúdos globais"
                        disabled={!isSentFile}
                        OnClick={() => handleNavigateButtons()}
                    />
                </form>
            </div>

            <div className={`p-8 mt-5`}>
                <form
                /* method="POST"
                    action="?/saveGlobalContent"
                    enctype="multipart/form-data"
                    class={``}
                    use:enhance={() => {
                    return async ({ update, result }) => {
                        await update({ reset: true })
                        finishedUploadFile = true

                        document.getElementById("title").value = ""

                        if (result.type == "failure" || result.data.status == false) {
                        finishedUploadFile = false
                        error = String(result?.data?.error)
                        failureUploadGlobalContent = true
                        successUploadGlobalContent = false
                        }

                        if (result.type == "success" && result.data.status == true) {
                        finishedUploadFile = true
                        error = ""
                        failureUploadGlobalContent = false
                        successUploadGlobalContent = true

                        if (finishedUploadFile) {
                            // goto("/workout/members")
                        } else {
                            finishedUploadFile = false
                        }
                        }
                        uploadAnimation = false
                        finishedUploadFile = false

                        if (document.getElementById("fileInput")) {
                        document.getElementById("fileInput").value = ""
                        filesEnabled = true
                        }

                        if (document.getElementById("inputURL")) {
                        document.getElementById("inputURL").value = ""
                        urlEnabled = true
                        }
                    }
                    }} */
                >
                    <div className={`flex justify-center items-center gap-2`}>
                        <FieldForm label="workoutTitle" name="Título:" obrigatory={true}>
                            <Input
                                styles={`mt-1 p-2 border-2 rounded outline-none transition
                                font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                                duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                                dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                                dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                                focus:border-[--focus-input-login]`}
                                name="workoutTitle"
                                type="text"
                                id="workoutTitle"
                                onForm={true}
                                value={watch("workoutTitle")}
                                register={register}
                            />
                        </FieldForm>

                        <FieldForm
                            label="workoutPhases"
                            name="Fase:"
                            error=''
                        >
                            <SelectField
                                name="workoutPhases"
                                id="workoutPhases"
                                styles={``}
                                required
                                onForm={true}
                                value={watch("workoutPhases")}
                                register={register}
                            >
                                <Option value={0} firstValue={"Treinamento Inicial"} />
                                {WorkoutAllPhases.map((item, i) => {
                                    if (item.Id_Phase != 6) {
                                        return (

                                            <Option key={i} value={item.Id_Phase} firstValue={item.Phase} />
                                        )
                                    }
                                })}
                            </SelectField>
                        </FieldForm>
                    </div>

                    <div className={`flex flex-row gap-2 items-center mt-3`}>

                        <button
                            type="button"
                            className={isFile == 1 ? "w-4 h-4 rounded-full border-[1px] border-blue-500 flex justify-center items-center" : "w-4 h-4 border-gray-500 border-[1px] rounded-full"}
                            name="fileInput"
                            value="1"
                            onClick={() => openSelect()}
                        >
                            <div className={isFile == 1 ? "w-[10px] h-[10px] bg-blue-500 rounded-full" : ""}> </div>

                        </button>

                        <p>
                            Arquivo
                        </p>

                        <button
                            type="button"
                            className={isFile == 0 ? "w-4 h-4 rounded-full border-[1px] border-blue-500 flex justify-center items-center" : "w-4 h-4 border-gray-500 border-[1px] rounded-full"}
                            name="urlInput"
                            value="0"
                            onClick={() => closeSelect()}
                        >
                            <div className={isFile == 0 ? "w-[10px] h-[10px] bg-blue-500 rounded-full" : ""}
                            > </div>

                        </button>

                        <p>
                            URL de vídeo do YouTube
                        </p>
                    </div>

                    <div className={`flex justify-between items-center`}>
                        {isFile == 1 ?
                            <input
                                ref={filename}
                                type="file"
                                name="file"
                                id="fileInput"
                                className={`w-fit my-14`}
                                onChange={() => verifyFile()}
                            />
                            :
                            <FieldForm label="workoutURL" name="URL do vídeo:" obrigatory={true}>
                                <Input
                                    styles={`mt-1 my-14 p-2 border-2 rounded outline-none transition
                                    font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                                    duration-200 w-fit placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                                    dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                                    dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                                    focus:border-[--focus-input-login]`}
                                    name="workoutURL"
                                    type="text"
                                    id="workoutURL"
                                    onForm={true}
                                    value={watch("workoutURL")}
                                    register={register}
                                />
                            </FieldForm>
                        }

                        <div className={`flex flex-row gap-2 items-center`}>

                            {failureUploadGlobalContent &&
                                <p className={`font-bold text-red-500`}>
                                    Erro ao enviar o conteúdo!
                                </p>
                            }

                            {successUploadGlobalContent &&
                                <p className={`font-bold text-green-500`}>
                                    Conteúdo enviado com sucesso!
                                </p>
                            }

                            <Button
                                text="Salvar o arquivo"
                                styles={`w-60 text-md`}
                                disabled={filesEnabled || urlEnabled || input.length == 0 || finishedUploadFile}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </PaperBlock>
    )

}