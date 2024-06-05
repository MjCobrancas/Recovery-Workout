'use client'

import { updateWorkoutChangedPhase } from "@/api/workout/change-phase/updateWorkoutChangedPhase";
import { Ancora } from "@/components/Ancora";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IChangePhase, changePhaseFormData, changePhaseFormSchema } from "@/interfaces/workout/change-phase/ChangePhaseForm";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function ChangePhaseForm({ user, phases, backOffice, idWorkout }: IChangePhase) {

    const [userFinished, setUserFinished] = useState(false)
    const [result, setResult] = useState<"Created" | false>(false)
    const [userDimissal, setUserDimissal] = useState(false)
    const [saveForm, setSaveForm] = useState(false)
    const [uploadAnimation, setUploadAnimation] = useState(false)
    const [newUserPhase, setNewUserPhase] = useState(user.Id_Phase)
    const [disableButton, setDisableButton] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<changePhaseFormData>({
        resolver: zodResolver(changePhaseFormSchema)
    })

    function changeStatusOfFinishedUser(state: boolean) {
        setUserFinished(state)

        if (state) {
            setUserDimissal(false)
        }
    }

    function changeStatusOfDimissalUser(state: boolean) {
        setUserDimissal(state)

        if (state) {
            setUserFinished(false)
        }
    }

    async function updateWorkoutPhase(data: FieldValues) {
        setDisableButton(true)

        const object = {
            id_workout: idWorkout,
            id_phase: Number(data.workoutPhases),
            id_responsible: Number(data.responsable),
            is_finish_workout: userFinished,
            is_dimissal: userDimissal
        }

        const wUpdateChangedPhase: 'Created' | false = await updateWorkoutChangedPhase<typeof object>(object)

        setResult(wUpdateChangedPhase)
        setSaveForm(true)

        setTimeout(() => {
            setSaveForm(false)
            setResult(false)
            setDisableButton(false)
        }, 3000);
    }



    return (

        <form
            onSubmit={handleSubmit(updateWorkoutPhase)}
        >
            <div className={`flex justify-center items-center gap-2`}>
                <div className={`flex justify-center items-center gap-2`}>
                    <FieldForm label="workoutIdUser" name=" Operador:" obrigatory={true}>
                        <SelectField name="operator" id="operator" styles={`h-11`} disabled>
                            <Option
                                value={`${user.Name} ${user.Last_Name}`}
                                firstValue={`${user.Name} ${user.Last_Name}`}
                            />
                        </SelectField>
                    </FieldForm>

                    <div className="w-96">
                        <FieldForm
                            label="workoutPhases"
                            name=" Selecionar nova fase:"
                            error={errors.workoutPhases && "Inválido"}
                            obrigatory={true}
                        >
                            <SelectField
                                OnChange={((event: ChangeEvent<HTMLSelectElement>) => setNewUserPhase(Number(event.target.value)))}
                                name="workoutPhases"
                                id="workoutPhases"
                                styles={`h-11`}
                                required
                                onForm={true}
                                value={watch("workoutPhases")}
                                register={register}
                            >
                                {phases.map((item) => {
                                    return (
                                        <Option
                                            key={item.Id_Phase}
                                            value={item.Id_Phase}
                                            firstValue={item.Phase}
                                            selectedValue={user.Id_Phase}
                                        />
                                    )
                                })}
                            </SelectField>
                        </FieldForm>
                    </div>
                </div>

                <div>
                    <FieldForm
                        label="responsable"
                        name=" Reponsável:"
                        error={errors.responsable && "Inválido"}
                        obrigatory={true}
                    >
                        <SelectField
                            name="responsable"
                            id="responsable"
                            styles={`h-10 w-fit`}
                            required
                            onForm={true}
                            value={watch("responsable")}
                            register={register}
                        >
                            <Option value={0} firstValue={"Selecione"} />

                            {backOffice.map((item) => {
                                return (
                                    <Option
                                        key={item.Id_User}
                                        value={item.Id_User}
                                        firstValue={`${item.Name} ${item.Last_Name}`}
                                    />
                                )
                            })}
                        </SelectField>
                    </FieldForm>
                </div>
            </div>

            <div className={`flex justify-center items-center gap-5 mt-10`}>
                {newUserPhase == 6 && (
                    <div className={`flex gap-2`}>
                        <p className={`font-medium`}>Operator apto para operação</p>
                        <button
                            type="button"
                            onClick={() => changeStatusOfFinishedUser(!userFinished)}
                            className={`px-2 py-1 duration-200 rounded-sm hover:text-white w-fit
                            ${userFinished
                                    ? `bg-green-400 hover:bg-green-500`
                                    : `bg-red-400 hover:bg-red-500`
                                }
                        `}
                        >
                            {userFinished ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}
                        </button>
                    </div>
                )}


                <div className={`flex gap-2`}>
                    <p className={`font-medium`}>Operador foi desligado da empresa</p>
                    <button
                        type="button"
                        onClick={() => changeStatusOfDimissalUser(!userDimissal)}
                        className={` px-2 py-1 duration-200 rounded-sm hover:text-white w-fit 
                            ${userDimissal
                                ? ` bg-green-400 hover:bg-green-500`
                                : `bg-red-400 hover:bg-red-500`
                            }
                        `}
                    >
                        {userDimissal ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faXmark} />}
                    </button>
                </div>
            </div>

            <div className={`flex justify-between items-end mt-40`}>
                <Ancora
                    title="Voltar"
                    toGo="/workout/members"
                    styles={`ml-1 mb-1 w-16`}
                />

                <div className={`flex justify-between items-center mr-2 gap-5`}>
                    {saveForm &&
                        <p className={result == "Created" ? `font-bold text-green-500` : `font-bold text-red-500`}>{result == "Created" ? "Dados atualizados!" : "Erro ao atualizar os dados"}</p>
                    }

                    <Button
                        name="params"
                        text="Salvar alterações"
                        styles={`w-60 text-md mr-2 mb-2`}
                        disabled={disableButton}
                    />

                    {uploadAnimation && (
                        <div className={`p-2`}>
                            <p>Carregando...</p>
                        </div>
                    )}

                </div>
            </div>
        </form>
    )
}