import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors"
import { IQuotes } from "./IEditQuotes"

interface IDialogCloneQuotesHeaderProps {
    idCreditor: number
    creditors: ICreditorGetAllCreditors[]
    creditorQuotes: IQuotes[]
    disableAllButtons: boolean
    setDisableAllButtons: (value: boolean) => void
    closeDialog: () => void
}

interface IDialogCloneQuotesFormProps {
    cloneIdCreditor: number
    creditorQuotes: IQuotes[]
    creditorCloneQuotes: IQuotes[]
    handleCloseDialog: () => void
    disableAllButtons: boolean,
    setDisableAllButtons: (value: boolean) => void
}

interface IDialogCloneForm extends IQuotes {
    IsNew: boolean
}

interface IQuotesCloneUpdateResponse {
    Id_Phrase: number
    Position: number
}

export type { IDialogCloneQuotesHeaderProps, IDialogCloneQuotesFormProps, IDialogCloneForm, IQuotesCloneUpdateResponse }