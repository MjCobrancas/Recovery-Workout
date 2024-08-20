import { verifyUserToken } from "@/api/generics/verifyToken";
import { createAvaliationQuestion } from "@/api/workout/prepare-avaliation/createAvaliationQuestion";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IAvaliationCreateQuestionFormProps } from "@/interfaces/workout/prepare-avaliation/IAvaliationCreateQuestionForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export function AvaliationCreateQuestionForm({ idCreditor, disableAllButtons, setValueDisableAllButtons }: IAvaliationCreateQuestionFormProps) {

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<{ question: string }>({
        defaultValues: {
           question: ""
        },
        resolver: zodResolver(z.object({ question: z.string().min(1) }))
    })

    async function handleCreateQuestion(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setValueDisableAllButtons(true)

        const object = {
            question: String(data.question),
            have_image: false,
            id_creditor: idCreditor
        }

        const responseCreateQuestion = await createAvaliationQuestion<typeof object>(object)

        setValueDisableAllButtons(false)

        if (!responseCreateQuestion.status) {
            toast.error("Houve um erro na criação da pergunta para o credor, revise os valores e tente novamente")

            return
        }

        toast.success("Pergunta cadastrada com sucesso!")
        reset()
    }

    return (
        <form className="w-full flex justify-start items-center mt-14" onSubmit={handleSubmit(handleCreateQuestion)}>
            <div className="flex justify-between items-center gap-3 flex-1">
                <FieldForm
                    label="questionField"
                    name="Questão"
                    error={errors.question && "Inválido"}
                >
                    <Input
                        id="question"
                        name="question"
                        type="input"
                        styles={`${String("") == `questionField`
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                            }`}
                        placeholder="Digite a questão"
                        disabled={disableAllButtons}
                        onForm={true}
                        register={register}
                        value={watch("question")}
                    />
                </FieldForm>
                <Button
                    type="submit"
                    name="idQuestion"
                    text="Salvar Alterações"
                    styles={`w-80 h-11 text-md self-end`}
                    disabled={disableAllButtons}
                />
            </div>
        </form>
    )
}