import { verifyUserToken } from "@/api/generics/verifyToken";
import { avaliationFilter } from "@/api/workout/prepare-avaliation/avaliationFilter";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IAvaliationRealizedFilterForm, IAvaliationRealizedFilterFormSchema, IAvaliationRealizedFilterProps } from "@/interfaces/workout/realized/IAvaliationRealizedFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function AvaliationRealizedFilter({ avaliations, creditors, operators, setValueAvaliationList }: IAvaliationRealizedFilterProps) {

    const router = useRouter()

    const [disableButton, setDisableButton] = useState(false)
    const [didFilter, setDidFilter] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset, setError } = useForm<IAvaliationRealizedFilterForm>({
        defaultValues: {
            id_creditor: "0",
            id_user: "0",
            select_date: "",
            date: ""
        },
        resolver: zodResolver(IAvaliationRealizedFilterFormSchema)
    })

    async function handleFilter(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        if (data.select_date != "" && data.date != "") {
            setError("date", { type: '400' })
            setError("select_date", { type: '400' })

            return
        }

        setDisableButton(true)
        setDidFilter(true)

        const requestObject = {
            id_creditor: Number(data.id_creditor),
            id_user: Number(data.id_user),
            date: String(data.select_date) != "" ? String(data.select_date) : String(data.date)
        }

        const requestFilter = await avaliationFilter(requestObject)

        setDisableButton(false)

        if (!requestFilter.status) {
            toast.error("Houve um erro para fazer o filtro, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        setValueAvaliationList(requestFilter.data != null ? requestFilter.data : [])
    }

    return (
        <form onSubmit={handleSubmit(handleFilter)} className="flex justify-center items-center gap-3">
            <FieldForm
                label="creditor"
                name="Credor"
                obrigatory={false}
                styles="w-1/5"
                error={errors.id_creditor && "Inválido"}
            >
                <SelectField
                    name="id_creditor"
                    id="selectCreditor"
                    styles={`${errors.id_creditor
                        ? "border-[--label-color-error] dark:border-[--label-color-error]"
                        : ""
                        }`}
                    onForm={true}
                    register={register}
                    value={watch('id_creditor')}
                >
                    <Option value={"0"} firstValue={"Selecione"} />

                    {creditors.map((creditor, index) => {
                        return (
                            <Option key={index} value={creditor.Id_Creditor} firstValue={creditor.Creditor} />
                        )
                    })}
                </SelectField>
            </FieldForm>
            <FieldForm
                label="id_user"
                name="Operador"
                obrigatory={false}
                styles="w-1/5"
                error={errors.id_user && "Inválido"}
            >
                <SelectField
                    name="id_user"
                    id="selectOperator"
                    styles={`${errors.id_user
                        ? "border-[--label-color-error] dark:border-[--label-color-error]"
                        : ""
                        }`}
                    onForm={true}
                    register={register}
                    value={watch("id_user")}
                >
                    <Option value={"0"} firstValue={"Selecione"} />

                    {operators.map((operator, index) => {
                        return (
                            <Option key={index} value={operator.Id_User} firstValue={`${operator.Name} ${operator.Last_Name}`} />
                        )
                    })}
                </SelectField>
            </FieldForm>

            <FieldForm
                label="select_date"
                name="Período:"
                obrigatory={false}
                styles={`w-[200px] p-0`}
                error={errors.select_date && "Inválido"}
            >
                <SelectField
                    name="select_date"
                    id="select_date"
                    styles={`w-full h-11 ${errors.select_date
                        ? "border-[--label-color-error] dark:border-[--label-color-error]"
                        : ""
                        }`}
                    register={register}
                    onForm={true}
                    value={watch("select_date")}
                >
                    <Option value={""} firstValue={"Selecione"} />
                    <Option value={"7 DIAS"} firstValue={"7 DIAS"} />
                    <Option value={"15 DIAS"} firstValue={"15 DIAS"} />
                    <Option value={"30 DIAS"} firstValue={"30 DIAS"} />
                    <Option value={"45 DIAS"} firstValue={"45 DIAS"} />
                </SelectField>
            </FieldForm>

            <FieldForm
                label="date"
                name="Data:"
                obrigatory={false}
                styles={`w-fit`}
                error={errors.date && "Inválido"}
            >
                <Input
                    id="date"
                    name="date"
                    type="date"
                    styles={`w-full ${errors.date
                        ? "border-[--label-color-error] dark:border-[--label-color-error]"
                        : ""
                    }`}
                    onForm={true}
                    register={register}
                    value={watch("date")}
                />
            </FieldForm>
            <div className={`flex w-fit gap-3 self-end`}>

                <Button
                    type="submit"
                    text="Filtrar"
                    disabled={disableButton}
                    styles={`w-full md:w-[90px] text-md h-11`}
                />

                <input
                    type="reset"
                    value="Remover filtros"
                    onClick={() => {
                        setTimeout(() => {
                            setDidFilter(false)
                            setValueAvaliationList(avaliations)
                            reset()
                        }, 100)
                    }}
                    disabled={!didFilter}
                    className={`h-11 w-18 text-md font-medium p-2 border border-red-400 text-red-500    rounded-md hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                />
            </div>
        </form>
    )
}