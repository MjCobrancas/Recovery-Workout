'use client'

import { getCreditorFiles } from "@/api/workout/instructions/getCreditorFiles";
import { getGlobalFiles } from "@/api/workout/instructions/getGlobalFiles";
import { getInitialGlobalFile } from "@/api/workout/instructions/getInitialGlobalFiles";
import { getOperatorFiles } from "@/api/workout/instructions/getOperatorFiles";
import { IWorkoutFiles } from "@/interfaces/workout/instructions/WorkoutFiles";
import { faFileArchive, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faFolderClosed, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function ModalTrainingBar({ initialGlobalFiles, globalFiles, creditorFiles, operatorFiles, index, getFileCallBack }: IWorkoutFiles) {

    const [folder, setFolder] = useState<"open" | "close">("close")
    const [folderInitialGlobalFiles, setFolderInitialGlobalFiles] = useState<"open" | "close">("close")
    const workoutPhaseName = [
        "Treinamento Script",
        "Treinamento Sistema",
        "Treinamento Regra de Carteira",
        "Treinamento Reversão",
        "Treinamento Receptivo",
    ]

    async function handleInitialGlobalFiles(Id_Global_File: number, YoutubeExternalVideo: string | null, FileExtension: string | null | undefined) {

        return getFileCallBack(Id_Global_File, YoutubeExternalVideo, getInitialGlobalFile, String(FileExtension))
    }
    function handleOperatorFiles(Id_File_Operator: number, YoutubeExternalVideo: string | null, FileExtension: string | null | undefined) {

        return getFileCallBack(Id_File_Operator, YoutubeExternalVideo, getOperatorFiles, String(FileExtension))
    }

    function handleCreditorFiles(Id_File_Creditor: number, YoutubeExternalVideo: string | null, FileExtension: string | null | undefined) {
        return getFileCallBack(Id_File_Creditor, YoutubeExternalVideo, getCreditorFiles, String(FileExtension))
    }

    function handleGlobalFiles(Id_Global_File: number, YoutubeExternalVideo: string | null, FileExtension: string | null | undefined) {

        return getFileCallBack(Id_Global_File, YoutubeExternalVideo, getGlobalFiles, String(FileExtension))
    }

    return (
        <>
            {index == 0 &&
                <div>
                    <div className={`flex flex-col gap-1 scroll-smooth overflow-y-auto
                scrollbar-thumb-slate-400 scrollbar-track-[--bg-dark-sidebar]
                scrollbar-thin border-solid border-[1px] border-blue-500 rounded-md hover:bg-[--hover-light-rout dark:bg-transparent`}>
                        <details
                            className={`relative before:duration-200 open:before:rotate-[225deg]
                        before:absolute before:w-2 before:h-2 before:top-[10px] before:right-0 before:mt-3 before:mr-4 before:border-solid before:border-[--bg-login]
                        before:dark:border-[--light-blue-opacity] before:border-t-0 before:border-r-2
                        before:border-b-2 before:border-l-0 before:p-1 before:rotate-45 
                        `}
                        >
                            {initialGlobalFiles.map((item, i) => {
                                return (
                                    <div key={i} className={`flex flex-col gap-1 pl-8`}>
                                        <span className={`w-[16rem] p-1 flex items-center cursor-pointer gap-3`}>
                                            <FontAwesomeIcon icon={faFileArchive} className={`pl-4`} />
                                            <button
                                                type="button"
                                                onClick={() => handleInitialGlobalFiles(
                                                    item.Id_Global_File,
                                                    item.YoutubeExternalVideo,
                                                    item.FileExtension

                                                )}
                                                className={`w-[16rem text-left underline]`}
                                            >
                                                {item.Title}
                                            </button>
                                        </span>
                                    </div>
                                )
                            })}

                            <summary
                                className={`flex w-full font-bold text-[--bg-login] dark:text-[--light-blue-opacity] hover:bg-[--hover-light-route] dark:hover:bg-[--hover-dark-route] pr-2 rounded-md cursor-pointer`}
                                onClick={() => setFolderInitialGlobalFiles((state) => state == "open" ? "close" : "open")}
                            >
                                <span
                                    className={`p-5 h-full flex align-baseline items-center gap-3 dark:text-white`}
                                >
                                    {folderInitialGlobalFiles == "open" ? (
                                        <FontAwesomeIcon icon={faFolderOpen} className="w-5 h-5" />
                                    ) : (
                                        <FontAwesomeIcon icon={faFolderClosed} className="w-5 h-5" />
                                    )}

                                    <p className={`w-full dark:text-white`}>Treinamento Inicial</p>
                                </span>
                            </summary>
                        </details>
                    </div>
                </div>
            }

            {creditorFiles.length > 0 || operatorFiles.length > 0 || globalFiles.length > 0 ? (
                <div
                    className={`flex flex-col gap-1 border-solid border-[1px] border-blue-500 rounded-md hover:bg-[--hover-light-rout dark:bg-transparent`}
                >
                    <details
                        className={`relative before:duration-200 open:before:rotate-[225deg]
                                before:absolute before:w-2 before:h-2 before:top-[10px] before:right-0 before:mt-3 before:mr-4 before:border-solid before:border-[--bg-login]
                                before:dark:border-[--light-blue-opacity] before:border-t-0 before:border-r-2
                                before:border-b-2 before:border-l-0 before:p-1 before:rotate-45`}
                    >
                        {operatorFiles.map((item, i) => {
                            return (
                                <div key={i} className={`flex flex-col gap-1 pl-8`}>
                                    <span
                                        className={`w-full p-1 flex justify-start items-center gap-3 cursor-pointer`}
                                    >
                                        <FontAwesomeIcon icon={faFileArchive} className={`pl-4`} />

                                        <button
                                            type="button"
                                            onClick={() => handleOperatorFiles(
                                                item.Id_File_Operator,
                                                item.YoutubeExternalVideo,
                                                item.FileExtension
                                            )}
                                            className={`text-left underline`}
                                        >
                                            {item.Title}
                                        </button>
                                    </span>
                                </div>
                            )
                        })}

                        {creditorFiles.map((item, i) => {
                            return (
                                <div key={i} className={`flex flex-col gap-1 pl-8`}>
                                    <span
                                        className={`w-full p-1 flex justify-start items-center gap-3 cursor-pointer`}
                                    >
                                        <FontAwesomeIcon icon={faFileArchive} className={`pl-4`} />

                                        <button
                                            type="button"
                                            onClick={() => handleCreditorFiles(
                                                item.Id_File_Creditor,
                                                item.YoutubeExternalVideo,
                                                item.FileExtension
                                            )}
                                            className={`text-left underline`}
                                        >
                                            {item.Title}
                                        </button>
                                    </span>
                                </div>
                            )
                        })}

                        {globalFiles.map((item, i) => {
                            return (
                                <div key={i} className={`flex flex-col gap-1 pl-8`}>
                                    <span
                                        className={`w-full p-1 flex justify-start items-center gap-3 cursor-pointer`}
                                    >
                                        <FontAwesomeIcon icon={faFileArchive} className={`pl-4`} />

                                        <button
                                            type="button"
                                            onClick={() => handleGlobalFiles(
                                                item.Id_Global_File,
                                                item.YoutubeExternalVideo,
                                                item.FileExtension
                                            )}
                                            className={`text-left underline`}
                                        >
                                            {item.Title}
                                        </button>
                                    </span>
                                </div>
                            )
                        })}

                        <summary
                            className={`flex w-full font-bold text-[--bg-login] hover:bg-[--hover-light-route] dark:hover:bg-[--hover-dark-route] pr-2 rounded-md cursor-pointer dark:text-[--text-input-dark]`}
                            onClick={() => setFolder((state) => state == "open" ? "close" : "open")}
                        >
                            <span
                                className={`w-full p-5 h-full flex align-baseline items-center gap-3`}
                            >
                                {folder == "open" ? (
                                    <FontAwesomeIcon icon={faFolderOpen} className="w-5 h-5" />
                                ) : (
                                    <FontAwesomeIcon icon={faFolderClosed} className="w-5 h-5" />
                                )}
                                <p className={`w-full`}>{workoutPhaseName[index]}</p>
                            </span>
                        </summary>
                    </details>
                </div>
            ) : (
                <div
                    className={`border-solid border-[1px] border-blue-500 rounded-md flex gap-5 w-full h-16 p-2 items-center cursor-not-allowed bg-slate-200 dark:bg-slate-700 dark:border-slate-500"`}
                >
                    <FontAwesomeIcon icon={faLock} className={`text-[--bg-login] ml-2 dark:text-white`} aria-hidden="true" />

                    <span
                        className={`font-bold text-[--bg-login] dark:text-white`}
                    >
                        {workoutPhaseName[index]}
                    </span>
                </div>
            )}
        </>
    )
}