import { saveWorkoutAvaliationAnswers } from "@/api/workout/instructions/saveWorkoutAvaliationAnswers";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { AvalationFormSchema, IAvaliationForm, IAvaliationFormProps } from "@/interfaces/workout/instructions/IAvaliationForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function AvaliationForm({ creditor, questions }: IAvaliationFormProps) {

    const { control, register, handleSubmit, watch, formState: { errors }, reset } = useForm<{ userAnswers: IAvaliationForm[] }>({
        resolver: zodResolver(AvalationFormSchema)
    })

    useFieldArray({
        control,
        name: "userAnswers"
    })

    const [disableSubmitButton, setDisableSubmitButton] = useState(false)

    async function handleSubmitAnswers(data: FieldValues) {
        setDisableSubmitButton(true)

        const objectQuestionsFormat = []
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i]

            objectQuestionsFormat.push({
                Id_Avaliation_Question: question.Id_Avaliation_Question,
                Answer: data.userAnswers[i].answer
            })
        }

        const object = {
            Id_Creditor: creditor[0].Id_Creditor,
            Id_User: creditor[0].Id_User,
            Questions: objectQuestionsFormat
        }

        const saveAnswers = await saveWorkoutAvaliationAnswers<typeof object>(object)

        setDisableSubmitButton(false)

        if (!saveAnswers.status) {
            toast.error("Houve um erro ao enviar as respostas, revise as respostas e tente novamente!", {
                duration: 5000
            })
        }

        toast.success("Respostas enviadas com sucesso!", {
            duration: 5000
        })

        reset()
    }

    return (
        <form 
            className="w-full h-full overflow-y-scroll"
            onSubmit={handleSubmit(handleSubmitAnswers)}
        >
            {questions.length > 0 &&

                <h2
                    className={`mt-5 mb-10 text-gray-800 text-center text-3xl font-bold`}
                >
                    Perguntas do credor da {creditor[0].Creditor}
                </h2>
            }

            {questions.map((item, index) => {
                return (
                    <div key={index} className={`w-full px-2 mb-5`}>
                        <FieldForm
                            label={`userAnswers.${index}.answer`}
                            name={`${item.Question}`}
                            error={errors.userAnswers && errors.userAnswers[index]?.answer && "Inválido!"}
                        >
                            <Input
                                id={`userAnswers.${index}.answer`}
                                name={`userAnswers.${index}.answer`}
                                type="text"
                                styles={errors.userAnswers && errors.userAnswers[index]?.answer ? `border-[--label-color-error] dark:border-[--label-color-error]` : ""}
                                value={watch(`userAnswers.${index}.answer`)}
                                onForm={true}
                                register={register}
                            />
                        </FieldForm>
                    </div>
                )
            })}

            <div className={`flex flex-1 justify-end items-center`}>
                <Button
                    type="submit"
                    text="Enviar Respostas"
                    name="createAvaliationQuestions"
                    styles={`w-fit text-xl p-2 mt-10 mr-2 mb-2`}
                    disabled={disableSubmitButton}
                />
            </div>
        </form>
    )
}