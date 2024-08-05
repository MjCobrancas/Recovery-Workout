'use client'

import { Button } from "@/components/Button";
import { IWorkoutDialogQuitter } from "@/interfaces/workout/members/WorkoutMembers";
import { useRef } from "react";

export function WorkoutDialogQuitter({ quitterUsers }: IWorkoutDialogQuitter) {

    const dialog = useRef<HTMLDialogElement>(null)

    function openDialog() {
        dialog.current?.showModal()
    }

    function closeDialog() {
        dialog.current?.close()
    }

    return (
        <>
            <Button
                type="button"
                name="quitterUsers"
                text={`Desistentes do mês: ${String(quitterUsers!.length).padStart(2, "0")}`}
                styles={`ml-2 border border-red-500 focus:bg-transparent focus:text-red-500 rounded-md bg-transparent
                        duration-200 px-2 py-2 text-red-500 hover:bg-red-500 dark:bg-transparent
                        dark:hover:bg-red-500 dark:focus:bg-transparent
                        w-fit text-md
                        `}
                OnClick={() => openDialog()}
            />

            <dialog
                ref={dialog}
                id={`w-11/12 max-lg:w-3/4 p-2 rounded-lg dark:bg-slate-600 max-sm:w-full`}
                className={`w-11/12 max-lg:w-3/4 p-2 rounded-lg dark:bg-slate-600 max-sm:w-full`}
            >
                <section>
                    <h1 className={`black/80 dark:text-white text-lg font-medium text-center my-4 md:text-lg`}>
                        Lista de usuários desistentes neste mês
                    </h1>
                </section>

                <section className={`m-6`}>
                    <table className={`w-full table-auto`}>
                        <thead className={`bg-slate-200 dark:bg-slate-500 text-sm`}>
                            <tr>

                                <th className={`font-semibold p-2 dark:text-white/80 rounded-tl-md`}>
                                    Operador
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Responsável
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80 rounded-tr-md`}>
                                    Data da desistência
                                </th>

                            </tr>
                        </thead>
                        <tbody className={`items-center p-1 odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-500 dark:even:bg-slate-600`}>
                            { quitterUsers!.length > 0 && quitterUsers!.map((item, i) => {
                                return (
                                    <tr key={i} className={`odd:bg-gray-100 even:bg-gray-100 dark:odd:bg-slate-500 dark:even:bg-slate-600`}>

                                        <td className={`p-2 text-center`}>
                                            {item.Negotiator + " " + item.Negotiator_Last_Name}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {item.Responsable + " " + item.Responsable_Last_Name}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {item.Dimissal_At_Formatted}
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {quitterUsers!.length <= 0 && (
                        <p className="text-base font-bold">Não há desistências de operadores este mês!</p>
                    )}
                </section>

                <div className={`flex justify-end`}>
                    <Button
                        type="button"
                        text="Fechar"
                        styles={`w-fit h-fit border-red-400 bg-red-400 text-white hover:bg-red-500 focus:bg-red-400 text-md px-2 py-2`}
                        OnClick={() => closeDialog()}
                    />
                </div>
            </dialog>
        </>
    )
}