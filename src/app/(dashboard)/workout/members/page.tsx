import { workoutAbleUsers } from "@/api/workout/members/workoutAbleUsers";
import { workoutList } from "@/api/workout/members/workoutList";
import { workoutQuitterUsers } from "@/api/workout/members/workoutQuitterUsers";
import { Ancora } from "@/components/Ancora";
import { Button } from "@/components/Button";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { WorkoutDialogAble } from "@/components/workout/members/WorkoutDialogAble";
import { WorkoutDialogQuitter } from "@/components/workout/members/WorkoutDialogQuitter";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IWorkoutAbleUser, IWorkoutMembers, IWorkoutQuitterUser } from "@/interfaces/workout/members/WorkoutMembers";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function workoutMembers() {

    const data: IWorkoutMembers[] | null = await workoutList()

    const quitterUsers: IResultDefaultResponse<IWorkoutQuitterUser[] | null> = await workoutQuitterUsers()
    const ableUsers: IResultDefaultResponse<IWorkoutAbleUser[] | null> = await workoutAbleUsers()

    return (
        <PaperBlock styles={``}>
            <TextPrincipal
                text="Lista de Usuários em Treinamento"
                styles={`max-md:text-[2rem]`}
            />

            <div className={`flex items-end justify-between ml-2`}>
                <div className={`flex items-end gap-2`}>
                    <Ancora
                        title="Prepare a Avaliação"
                        toGo="/workout/prepare-avaliation"
                        styles={`border border-blue-500 rounded-md bg-transparent
                        duration-200 px-2 py-2 text-blue-500 hover:bg-blue-500 dark:bg-transparent
                        dark:hover:bg-blue-500
                        w-fit text-md`}
                    />

                    <Link
                        href="/workout/operator-content"
                        className={`bg-blue-400 rounded-md p-2 font-semibold text-black/80 text-white`}
                    >
                        Enviar conteúdos de operador
                    </Link>

                    <Link
                        href="/workout/creditor-content"
                        className={`bg-blue-400 rounded-md p-2 font-semibold text-black/80 text-white`}
                    >
                        Enviar conteúdos de credor
                    </Link>

                    <Link
                        href="/workout/global-content"
                        className={`bg-blue-400 rounded-md p-2 font-semibold text-black/80 text-white`}
                    >
                        Enviar conteúdo global
                    </Link>
                </div>

                <div className={`flex items-end`}>
                    <div className={`flex items-end`}>
                        <WorkoutDialogAble
                            ableUsers={ableUsers.data}
                        />
                    </div>

                    <div className={`flex items-end mr-2`}>
                        <WorkoutDialogQuitter 
                            quitterUsers={quitterUsers.data}
                        />
                    </div>
                </div>
            </div>

            <table className={`w-[96vw] px-4 mx-auto my-4`}>
                <thead className={`bg-gray-200 dark:bg-slate-600`}>
                    <tr>
                        <th className="font-semibold p-2 dark:text-white/80 rounded-tl-md"
                        >Data de Início
                        </th>

                        <th className="font-semibold p-2 dark:text-white/80">Negociador
                        </th>

                        <th className="font-semibold p-2 dark:text-white/80">Credor
                        </th>

                        <th className="font-semibold p-2 dark:text-white/80">Fase
                        </th>

                        <th className="font-semibold p-2 dark:text-white/80">Dias em treinamento
                        </th>

                        <th className="font-semibold p-2 dark:text-white/80 rounded-tr-md">Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data != null ? data.map((item: IWorkoutMembers) => {
                        return (
                            <tr
                                key={item.Id_User}
                                className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-500 dark:even:bg-slate-600`}
                            >
                                <td className="p-2 text-center"
                                >{item.Created_At_Formatted}</td>

                                <td className="p-2 text-center"
                                >{item.Name + " " + item.Last_Name}</td>

                                <td className="p-2 text-center">{item.Creditor}</td>

                                <td className="p-2 text-center">{item.Phase}</td>

                                <td className="p-2 text-center">{item.days_on_training}</td>

                                <td className="p-2 text-center">
                                    <Link
                                        className={`bg-blue-400 hover:bg-blue-500 duration-100 text-white rounded-md px-2 py-[5px]
                                        `}
                                        href={`/workout/change-phase/${item.Id_Workout}`}
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} fontSize={14} />
                                    </Link>
                                </td>
                            </tr>
                        )
                    }) : <p>Não foi possível carregar os usuários, tente logar novamente</p>}

                </tbody>
            </table>
        </PaperBlock>
    )
}