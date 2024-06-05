'use client'

import { ISelectTrainingFile, SelectTrainingFileData, SelectTrainingFileSchema } from "@/interfaces/components/SelectTrainingFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldForm } from "./FieldForm";
import { Input } from "./Input";
import { ChangeEvent, useState } from "react";
import { Button } from "./Button";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveWorkoutAvaliationAnswers } from "@/api/workout/instructions/saveWorkoutAvaliationAnswers";
import { faFileArchive } from "@fortawesome/free-solid-svg-icons";

export function SelectTrainingFile({ typeFile, fileUrl, YoutubeExternalVideo, CreditorQuestions, CreditorInfo }: ISelectTrainingFile) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SelectTrainingFileData>({
        resolver: zodResolver(SelectTrainingFileSchema)
    })

    const [showMessageServer, setShowMessageServer] = useState(false)
    const [messageServer, setMessageServer] = useState("")
    const [messageSuccess, setMessageSuccess] = useState(false)
    const [disableSubmitButton, setDisableSubmitButton] = useState(false)

    async function handleSubmitAnswers(data: FieldValues) {
        setDisableSubmitButton(true)

        // const saveAnswers = await saveWorkoutAvaliationAnswers<typeof object>(object)
    }

    return (

        <div
            className={`relative flex flex-1 h-full justify-center items-center text-[--bg-login]`}
        >
            {typeFile == "none" &&
                <div
                    className={`flex flex-col justify-center items-center dark:text-[--text-input-dark]`}
                >
                    <FontAwesomeIcon icon={faFileArchive} fontSize={32} aria-hidden="true" />
                    <h2 className="font-medium text-2xl">
                        Selecione o arquivo na barra lateral para exibir
                    </h2>
                </div>
            }

            <svg
                className="absolute top-5 right-2"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#1E90FF"
                viewBox="0 0 256 256"
            >   <path
                d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H128a88.1,88.1,0,0,0-88,88,8,8,0,0,1-16,0A104.11,104.11,0,0,1,128,96h76.69L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66Z"
            >   </path>
            </svg>

            {typeFile == "file" &&
                <iframe className="flex-1 h-full dark:bg-gray-100" src={fileUrl} />
            }

            {typeFile == "video" &&
                <iframe className="flex-1 h-full" src={YoutubeExternalVideo == null ? "" : YoutubeExternalVideo} />
            }

            {typeFile == "audio" && fileUrl &&
                <audio controls className={`w-full mb-2`} id="audio">
                    <source src={fileUrl} type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
            }

            {typeFile == "loading" &&
                <div className={`p-2`}>
                    Carregando...  {/* Colocar a roda de loading no lugar depois */}
                </div>
            }

            <form>
                {CreditorQuestions.length > 0 &&
                    <h2
                        className={`mt-5 mb-10 text-gray-800 text-center text-3xl font-bold`}
                    >
                        Perguntas do credor da {CreditorInfo[0].Creditor}
                    </h2>
                }

                {CreditorQuestions.map((item, index) => {
                    return (
                        <div key={index} className={`px-2 mb-5`}>
                            <FieldForm
                                label={`question${item.Id_Avaliation_Question}`}
                                name={`${item.Question}`}
                                error={errors.question && " "}
                            >
                                <Input
                                    id={`question${item.Id_Avaliation_Question}`}
                                    name={`question${item.Id_Avaliation_Question}`}
                                    type="text"
                                    styles="ablublé 2.0"
                                    value={errors.question ? `border-[--label-color-error] dark:border-[--label-color-error]` : ""}
                                    onInput={((event: ChangeEvent<HTMLInputElement>) => {
                                        item.Answer = event.target.value

                                        return CreditorQuestions
                                    })}
                                />
                            </FieldForm>
                        </div>
                    )
                })}

                <div className={`flex flex-1 justify-end items-center`}>
                    {/* <Button
                        type="submit"
                        text="Enviar Respostas"
                        name="createAvaliationQuestions"
                        styles={`w-fit text-xl p-2 mt-10 mr-2 mb-2`}
                        value=""
                        disabled={disableSubmitButton}
                        OnClick={() => console.log("oi")}
                    /> */}

                    {showMessageServer && (
                        <div className={`flex flex-1 justify-end items-center w-full my-4 pr-2`}>
                            <p
                                className={messageSuccess ? `w-72 font-bold text-emerald-600 text-right` : "w-72 font-bold text-red-600 text-right"}
                            >
                                {messageServer}
                            </p>
                        </div>
                    )
                    }

                    {/* {!showMessageServer &&
                        <p>Houve um problema para carregar as perguntas do credor</p>
                    } */}
                </div>
            </form>
        </div>
    )
}