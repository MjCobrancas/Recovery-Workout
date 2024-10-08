'use client'

import { verifyUserToken } from "@/api/generics/verifyToken";
import { getAvaliationQuestionsByIdUser } from "@/api/workout/instructions/avaliations/getAvaliationQuestionsByUser";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IAvaliationButtonProps } from "@/interfaces/workout/instructions/IAvaliationButton";
import { IGetAvaliationQuestionsResponse } from "@/interfaces/workout/instructions/IAvaliationForm";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function AvaliationButton({ changeTypeFileToAvaliation, changeTypeFile }: IAvaliationButtonProps) {

    const router = useRouter()

    async function handleClickButton() {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        changeTypeFile("loading")
        const getQuestions: IResultDefaultResponse<IGetAvaliationQuestionsResponse | null> = await getAvaliationQuestionsByIdUser()

        if (!getQuestions.status) {
            toast.error("Houve um erro ao tentar buscar as perguntas do Credor", {
                duration: 5000
            })

            changeTypeFile("none")
            return
        }

        changeTypeFileToAvaliation(getQuestions.data!.data.creditor, getQuestions.data!.data.questions)
    }

    return (
        <div
            className={`h-full flex items-center`}
        >
            <div className={`ml-5 w-5 h-5`}>
                <FontAwesomeIcon icon={faFilePen} className="w-5 h-5 ml-1" />
            </div>

            <button
                type="button"
                className={`w-full h-full p-4 text-left`}
                onClick={() => handleClickButton()}
            >
                Avaliação
            </button>
        </div>
    )
}