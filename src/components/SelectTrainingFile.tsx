'use client'

import { ISelectTrainingFile } from "@/interfaces/components/SelectTrainingFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { AvaliationForm } from "./workout/instructions/AvaliationForm";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { useRef } from "react";
import { ContainerTyperacer } from "./workout/typeracer/ContainerTyperacer";

export function SelectTrainingFile({ quotes, typeFile, fileUrl, YoutubeExternalVideo, CreditorQuestions, CreditorInfo }: ISelectTrainingFile) {

    const recorderControls = useAudioRecorder()
    const audioRef = useRef<HTMLAudioElement>(null)

    function handleAddAudioRecord(blob: Blob) {
        const url = URL.createObjectURL(blob)
        audioRef.current!.src = url
    }

    return (

        <div
            className={`relative flex flex-1 h-full justify-center items-center text-[--bg-login]`}
        >
            {typeFile == "none" &&
                <>
                    <div
                        className={`flex flex-col justify-center items-center dark:text-[--text-input-dark]`}
                    >
                        <FontAwesomeIcon icon={faFileArchive} className="w-8 h-8" />
                        <h2 className="font-medium text-2xl">
                            Selecione o arquivo na barra lateral para exibir
                        </h2>
                    </div>

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
                </>
            }

            {typeFile == "file" &&
                <iframe className="flex-1 h-full dark:bg-gray-100" src={fileUrl} />
            }

            {typeFile == "video" &&
                <iframe className="flex-1 h-full" src={YoutubeExternalVideo == null ? "" : YoutubeExternalVideo} />
            }

            {typeFile == "audio" && fileUrl &&
                <div className="w-2/4 h-full flex flex-col items-center justify-center font-medium">
                    <audio controls className={`w-full mb-2`} id="audio">
                        <source src={fileUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            }

            {typeFile == "loading" &&
                <div className={`p-2`}>
                    Carregando...
                </div>
            }

            {typeFile == "avaliation" && (
                <AvaliationForm creditor={CreditorInfo} questions={CreditorQuestions} />
            )}

            {typeFile == "voice" &&
                <div className="h-full py-8">
                    <h2 className="px-8 text-2xl text-center font-bold">Ouça sua própria voz para fazer uma auto análise sobre o que você pode melhorar durante a ligação</h2>

                    <div className="h-full flex flex-col justify-center items-center gap-2">
                        <p className="flex justify-center items-center gap-5">
                            Clique no botão abaixo para iniciar a gravação
                            <FontAwesomeIcon icon={faArrowDown} />
                        </p>
                        <AudioRecorder
                            onRecordingComplete={(blob) => handleAddAudioRecord(blob)}
                            recorderControls={recorderControls}
                        />
                        <p className="mt-8">Resultado da gravação:</p>
                        <audio ref={audioRef} controls={true} />
                    </div>
                </div>
            }

            {typeFile == "keyboard" &&
                <div className="h-full py-8">
                    <h2 className="px-8 text-2xl text-center font-bold mb-2">
                        Clique em iniciar para começar o exercício
                    </h2>

                    <div className="h-full flex justify-center items-center gap-2">
                        <ContainerTyperacer quotes={quotes} />
                    </div>

                </div>
            }
        </div>
    )
}