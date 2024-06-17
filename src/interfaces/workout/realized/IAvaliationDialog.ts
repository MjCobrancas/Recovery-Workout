interface IAvaliationDialogProps {
    avaliationOperator: IAvaliationOperator | null
    closeDialog: Function
}

interface IAvaliationOperator {
    avaliationAnswers: {
        Answer: string
        Question: string
    }[]
    avaliationHeader: {
        Created_At: string
        Created_At_Formatted: string
        Creditor: string
        Id_Form: number
        Name: string
        Last_Name: string
    }[]
}

export type { IAvaliationDialogProps, IAvaliationOperator }