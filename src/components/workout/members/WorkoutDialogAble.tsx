'use client'

import { Button } from "@/components/Button";
import { IWorkoutDialogAble } from "@/interfaces/workout/members/WorkoutMembers";
import { useRef } from "react";

export function WorkoutDialogAble({ ableUsers }: IWorkoutDialogAble) {

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
                name="ableUsers"
                text={`Aptos do mês: ${String(ableUsers!.length).padStart(2, "0")}`}
                styles={`ml-2 border border-green-500 focus:bg-transparent focus:text-green-500 rounded-md bg-transparent
                        duration-200 px-2 py-2 text-green-500 hover:bg-green-500 dark:bg-transparent
                        dark:hover:bg-green-500 dark:focus:bg-transparent
                        w-fit text-md
                        `}
                OnClick={() => openDialog()}
            />

            <dialog
                ref={dialog}
                id={`w-11/12 max-lg:w-3/4 p-2 rounded-lg dark:bg-slate-600 max-sm:w-full`}
                className={`w-11/12 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-900 max-sm:w-full`}
            >
                <section>
                    <h1 className={`black/80 dark:text-white text-lg font-medium text-center my-4 md:text-lg`}>
                        Lista de usuários aptos para a operação neste mês
                    </h1>
                </section>

                <section className={`mb-6`}>
                    <table className={`w-full table-auto`}>
                        <thead className={`bg-slate-200 dark:bg-zinc-800 text-sm`}>
                            <tr>

                                <th className={`font-semibold p-2 dark:text-white/80 rounded-tl-md`}>
                                    Operador
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    Responsável
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80 rounded-tr-md`}>
                                    Data da liberação
                                </th>

                            </tr>
                        </thead>
                        <tbody className={`items-center p-1 odd:bg-gray even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}>
                            {ableUsers!.length > 0 && ableUsers!.map((item, i) => {
                                return (
                                    <tr key={i} className={`odd:bg-gray-100 even:bg-gray-100 dark:odd:bg-zinc-700/30 dark:even:bg-zinc-800`}>

                                       <td className={`p-2 text-center dark:text-white/80`}>
                                            {item.Negotiator + " " + item.Negotiator_Last_Name}
                                       </td>

                                       <td className={`p-2 text-center dark:text-white/80`}>
                                            {item.Responsable + " " + item.Responsable_Last_Name}
                                       </td>

                                       <td className={`p-2 text-center dark:text-white/80`}>
                                            {item.End_At_Formatted}
                                       </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {ableUsers!.length <= 0 && (
                        <p className="text-base font-bold dark:text-white">Não há operadores que foram aptos para operação este mês!</p>
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