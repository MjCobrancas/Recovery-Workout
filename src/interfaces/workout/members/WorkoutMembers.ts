interface IWorkoutMembers {
    Id_Workout: number
    Id_User: number
    Name: string
    Last_Name: string
    Created_At: string
    Id_Phase: number
    Id_Creditor: number
    Creditor: string
    Phase: string
    days_on_training: string
    Created_At_Formatted: string
}

interface IWorkoutAbleUser {
    Responsable: string
    Responsable_Last_Name: string
    Negotiator: string
    Negotiator_Last_Name: string
    End_At: string
    End_At_Formatted: string
}

interface IWorkoutQuitterUser {
    Responsable: string
    Responsable_Last_Name: string
    Negotiator: string
    Negotiator_Last_Name: string
    Dimissal_At: string
    Dimissal_At_Formatted: string
}

interface IWorkoutDialogAble {
    ableUsers: IWorkoutAbleUser[] | null
}

interface IWorkoutDialogQuitter {
    quitterUsers: IWorkoutQuitterUser[] | null
}

export type { IWorkoutMembers, IWorkoutAbleUser, IWorkoutDialogAble, IWorkoutQuitterUser, IWorkoutDialogQuitter }