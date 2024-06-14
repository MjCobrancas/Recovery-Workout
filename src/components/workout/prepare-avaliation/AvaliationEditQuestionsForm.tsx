import { updateAvaliationQuestions } from "@/api/workout/prepare-avaliation/updateAvaliationQuestions";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { IAvaliationEditQuestionsFormProps } from "@/interfaces/workout/prepare-avaliation/IAvaliationEditQuestionsForm";
import { ICreditorAvaliationQuestions, creditorAvaliationQuestionsSchema } from "@/interfaces/workout/prepare-avaliation/IPrepareAvaliationInitialForm";
import { faArrowDown, faArrowUp, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function AvaliationEditQuestionsForm({ creditorQuestions, positionsValue, disableAllButtons, setValueDisableAllButtons }: IAvaliationEditQuestionsFormProps) {

    const [lowestPosition, setLowestPosition] = useState(positionsValue[0])
    const [highestPosition, setHighestPosition] = useState(positionsValue[1])

    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<{ creditorAvaliationQuestions: ICreditorAvaliationQuestions[] }>({
        defaultValues: {
            creditorAvaliationQuestions: useMemo(() => {
                return creditorQuestions.map((item) => {
                    return {
                        Id_Avaliation_Question: item.Id_Avaliation_Question,
                        Question: item.Question,
                        Question_Have_Image: item.Question_Have_Image,
                        Id_Creditor: item.Id_Creditor,
                        Position: item.Position,
                        Status: item.Status
                    }
                })
            }, [creditorQuestions])
        },
        resolver: zodResolver(creditorAvaliationQuestionsSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "creditorAvaliationQuestions"
    })

    useEffect(() => {
        const creditorQuestionsData: ICreditorAvaliationQuestions[] = []
        if (creditorQuestions.length == 0) {
            return
        }

        creditorQuestions.map((item) => {
            creditorQuestionsData.push({
                Id_Avaliation_Question: item.Id_Avaliation_Question,
                Question: item.Question,
                Question_Have_Image: item.Question_Have_Image,
                Id_Creditor: item.Id_Creditor,
                Position: item.Position,
                Status: item.Status
            })
        })

        reset({ creditorAvaliationQuestions: creditorQuestionsData })

    }, [creditorQuestions, reset])

    function goPositionUp(position: number, index: number) {
        if (position == lowestPosition) {
            return
        }
        
        const objectUpdateDown = fields[index - 1]
        objectUpdateDown.Position = position

        const objectUpdateUp = fields[index]
        objectUpdateUp.Position = position - 1

        update(index - 1, objectUpdateDown)
        update(index, objectUpdateUp)

        reset({ creditorAvaliationQuestions: fields.sort((a, b) => a.Position - b.Position) })
    }

    function goPositionDown(position: number, index: number) {
        if (position == highestPosition) {
            return
        }

        const objectUpdateDown = fields[index]
        objectUpdateDown.Position = position + 1

        const objectUpdateUp = fields[index + 1]
        objectUpdateUp.Position = position

        update(index, objectUpdateDown)
        update(index + 1, objectUpdateUp)

        reset({ creditorAvaliationQuestions: fields.sort((a, b) => a.Position - b.Position) })
    }

    function handleChangeQuestionStatus(status: boolean, index: number) {
        const object = fields[index]
        object.Status = !status

        update(index, object)
    }

    async function handleUpdateQuestions(data: FieldValues) {
        setValueDisableAllButtons(true)
        const object = { questions: data.creditorAvaliationQuestions }

        const updateAvalationQuestionResponse = await updateAvaliationQuestions<typeof object>(object)

        setValueDisableAllButtons(false)

        if (!updateAvalationQuestionResponse.status) {
            toast.error("Houve um erro na atualização das perguntas de avaliação do credor, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        toast.success("Perguntas de avaliação do credor atualizadas com sucesso!", {
            duration: 5000
        })
        
    }

    return (
        <>
            {creditorQuestions.length > 0 ? (
                <form className="flex flex-col gap-3 justify-center items-center px-10 w-[900px] border-t-[2px] border-gray-300 rounded" 
                onSubmit={handleSubmit(handleUpdateQuestions)}>
                    <table className="w-full mt-10">
                        <thead className="w-full bg-gray-200 dark:bg-slate-600">
                            <tr>
                                <th className="pl-6 text-left w-3/4 font-semibold p-2 dark:text-white/80 rounded-tl-md">Questão</th>
                                <th className="text-center font-semibold p-2 dark:text-white/80">Ações</th>
                                <th className="text-center font-semibold p-2 dark:text-white/80 rounded-tr-md">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((item, index) => {
                                return (
                                    <tr key={item.id} className="h-fit odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-500 dark:even:bg-slate-600 transition">
                                        <td className="h-fit p-2 text-center">
                                            <Input
                                                id={`creditorAvaliationQuestions.${index}.Question`}
                                                name={`creditorAvaliationQuestions.${index}.Question`}
                                                type="input"
                                                placeholder="Digite a questão"
                                                value={watch(`creditorAvaliationQuestions.${index}.Question`)}
                                                disabled={disableAllButtons}
                                                styles={errors.creditorAvaliationQuestions && errors.creditorAvaliationQuestions[index]?.Question ? "border-red-400" : ""}
                                                onForm={true}
                                                register={register}
                                            />
                                        </td>
                                        <td className="p-2 h-5 text-center">
                                            <button
                                                type="button"
                                                className="inline px-[9px] mr-[6px] py-1 duration-200 rounded-md cursor-pointer hover:text-white w-fit bg-green-400 hover:bg-green-500 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:text-black"
                                                onClick={() => goPositionUp(item.Position, index)}
                                                disabled={item.Position == lowestPosition || disableAllButtons}
                                            >
                                                <FontAwesomeIcon icon={faArrowUp} />
                                            </button>
                                            <button
                                                type="button"
                                                className="inline px-[9px] py-1 duration-200 rounded-md cursor-pointer hover:text-white w-fit bg-red-400 hover:bg-red-500 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:text-black"
                                                onClick={() => goPositionDown(item.Position, index)}
                                                disabled={item.Position == highestPosition || disableAllButtons}
                                            >
                                                <FontAwesomeIcon icon={faArrowDown} />
                                            </button>
                                        </td>
                                        <td className="p-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleChangeQuestionStatus(item.Status, index)}
                                                className={` px-2 py-1 duration-200 rounded-md hover:text-white w-fit disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed disabled:hover:text-black ${item.Status
                                                    ? ` bg-green-400 hover:bg-green-500`
                                                    : `bg-red-400 hover:bg-red-500 px-[9px]`
                                                    }`}
                                                disabled={disableAllButtons}
                                            >
                                                {item.Status ? (
                                                    <FontAwesomeIcon icon={faCheck} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faXmark} />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <Button
                        type="submit"
                        name="idQuestion"
                        text="Salvar Alterações"
                        styles={`w-30 h-11 mt-8 text-md self-end`}
                        disabled={disableAllButtons}
                    />
                </form>
            ) : (
                <div className="text-red-600">Este credor ainda não possui perguntas cadastradas.</div>
            )}
        </>
    )
}