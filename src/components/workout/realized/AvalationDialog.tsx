import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IAvaliationDialogProps } from "@/interfaces/workout/realized/IAvaliationDialog";

export function AvaliationDialog({ avaliationOperator, closeDialog, isLoadingDialog }: IAvaliationDialogProps) {

    return (
        <>
            {!isLoadingDialog ? (
                <>
                    {avaliationOperator != null && (
                        <>
                            <h2
                                className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
                            >
                                Monitoria {avaliationOperator.avaliationHeader[0].Id_Form}
                            </h2>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
                                <table
                                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                                >
                                    <thead
                                        className="text-sm text-gray-700 uppercase bg-gray-200 dark:bg-zinc-800 dark:text-gray-400"
                                    >
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Operador</th>
                                            <th scope="col" className="px-6 py-3">Credor</th>
                                            <th scope="col" className="px-6 py-3">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            className="bg-slate-100 border-b dark:bg-zinc-700 dark:border-zinc-900"
                                        >
                                            <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                                {avaliationOperator.avaliationHeader[0].Name} {avaliationOperator.avaliationHeader[0].Last_Name}
                                            </td>
                                            <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                                {avaliationOperator.avaliationHeader[0].Creditor}
                                            </td>
                                            <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                                {avaliationOperator.avaliationHeader[0].Created_At_Formatted}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex flex-col gap-8 p-2">
                                    <h3 className="w-full text-3xl text-center mt-10 font-normal dark:text-white">
                                        Questões do credor da
                                        <span className="ml-2 font-medium">{avaliationOperator.avaliationHeader[0].Creditor}</span>
                                    </h3>

                                    {avaliationOperator.avaliationAnswers.map((item, index) => {
                                        return (
                                            <FieldForm
                                                key={index}
                                                label={`question${index}`}
                                                name={`${item.Question}`}
                                            >
                                                <Input
                                                    id={`question${index}`}
                                                    name={`question${index}`}
                                                    type="text"
                                                    value={item.Answer}
                                                    disabled={true}
                                                />
                                            </FieldForm>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className={`flex justify-end`}>
                                <Button
                                    type="button"
                                    text="Voltar"
                                    styles={`w-fit h-fit border-blue-400 bg-blue-400 text-white hover:bg-blue-500
                                        focus:bg-blue-400 text-md px-2 py-2
                                    `}
                                    OnClick={() => closeDialog()}
                                />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <p className="text-left font-bold dark:text-white">Carregando...</p>
            )}
        </>
    )

}