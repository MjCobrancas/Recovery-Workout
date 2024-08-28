'use client'

import { IContainerAvaliationRealized } from "@/interfaces/workout/realized/IContainerAvaliationRealized"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AvaliationRealizedFilter } from "./AvaliationRealizedFilter"
import { useRef, useState } from "react"
import { IGetAllAvaliations } from "@/interfaces/workout/realized/IGetAllAvaliations"
import toast, { Toaster } from "react-hot-toast"
import { getAvaliationOperator } from "@/api/workout/prepare-avaliation/getAvaliationOperator"
import { IAvaliationOperator } from "@/interfaces/workout/realized/IAvaliationDialog"
import { AvaliationDialog } from "./AvalationDialog"
import { useRouter } from "next/navigation"
import { verifyUserToken } from "@/api/generics/verifyToken"

export function ContainerAvaliationRealized({ avaliations, creditors, operators }: IContainerAvaliationRealized) {

    const router = useRouter()

    const [avaliationsList, setAvaliationsList] = useState(avaliations)
    const [avaliationOperator, setAvaliationOperator] = useState<IAvaliationOperator | null>(null)
    const [isLoadingDialog, setIsLoadingDialog] = useState(true)
    const dialogRef = useRef<HTMLDialogElement>(null)

    function setValueAvaliationList(value: IGetAllAvaliations[]) {
        setAvaliationsList(value)
    }

    function openDialog() {
        dialogRef.current?.showModal()
    }

    function closeDialog() {
        dialogRef.current?.close()
    }

    async function handleGetOperatorAvaliation(id_form: number) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setIsLoadingDialog(true)
        openDialog()
        const requestForm = await getAvaliationOperator(id_form)

        if (!requestForm.status) {
            toast.error("Houve um erro ao buscar a avaliação do operador, tente novamente mais tarde")

            setIsLoadingDialog(false)
            closeDialog()

            return
        }

        setIsLoadingDialog(false)
        setAvaliationOperator(requestForm.data)
    }

    return (
        <>
            <dialog
                id="realized-dialog"
                className={`w-5/6 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-900 max-sm:w-full`}
                ref={dialogRef}
            >
                <AvaliationDialog 
                    avaliationOperator={avaliationOperator} 
                    closeDialog={closeDialog} 
                    isLoadingDialog={isLoadingDialog}
                />
            </dialog>
            <AvaliationRealizedFilter
                avaliations={avaliations}
                creditors={creditors}
                operators={operators}
                setValueAvaliationList={setValueAvaliationList}
            />
            <table className="w-[96vw] px-4 mx-auto my-4">
                <thead className="bg-gray-200 dark:bg-zinc-800">
                    <tr>
                        <th className="font-semibold p-2 dark:text-white/80 rounded-tl-md">Operador</th>
                        <th className="font-semibold p-2 dark:text-white/80">Credor</th>
                        <th className="font-semibold p-2 dark:text-white/80">Data</th>
                        <th className="font-semibold p-2 dark:text-white/80 rounded-tr-md">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {avaliationsList.length > 0 ? (
                        avaliationsList.map((item, index) => {
                            return (
                                <tr key={index} className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800">
                                    <td className="px-6 py-2 text-center font-medium dark:text-slate-50">{item.Name} {item.Last_Name}</td>
                                    <td className="px-6 py-2 text-center font-medium dark:text-slate-50">{item.Creditor}</td>
                                    <td className="px-6 py-2 text-center font-medium dark:text-slate-50">{item.Created_At_Formatted}</td>
                                    <td className="px-6 py-2 text-center font-medium dark:text-slate-50">
                                        <button
                                            type="button"
                                            className="bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 duration-100 text-white rounded-md px-2 py-[5px]"
                                            name="idForm"
                                            onClick={() => handleGetOperatorAvaliation(item.Id_Form)}
                                        >
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td className="text-red-500">Dados não encontrados</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}