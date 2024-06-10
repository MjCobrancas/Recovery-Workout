interface IInitialGlobalFiles {
    Id_Global_File: number
    Title: string
    YoutubeExternalVideo: string | null
    FileExtension: string | null | undefined
}

interface IGlobalFiles {
    Id_Global_File: number
    Title: string
    Id_Phase: number
    Created_At: string
    FileExtension: string | null | undefined
    YoutubeExternalVideo: string | null
}

interface ICreditorFiles {
    Id_File_Creditor: number
    Title: string
    YoutubeExternalVideo: string | null
    FileExtension: string | null | undefined
}

interface IOperatorFiles {
    Id_File_Operator: number
    Title: string
    YoutubeExternalVideo: string | null
    FileExtension: string | null | undefined
}

interface IWorkoutFilesResponse {
    creditorFiles: ICreditorFiles[]
    operatorFiles: IOperatorFiles[]
    globalFiles: IGlobalFiles[]
}

interface IWorkoutInitialGlobalFilesResponse {
    Id_Global_File: number
    Title: string
    YoutubeExternalVideo: string | null
    FileExtension: string | null | undefined
}

interface IWorkoutFiles {
    initialGlobalFiles: IInitialGlobalFiles[]
    globalFiles: IGlobalFiles[]
    creditorFiles: ICreditorFiles[]
    operatorFiles: IOperatorFiles[]
    index: number
    getFileCallBack: Function
}

export type { IInitialGlobalFiles, IGlobalFiles, ICreditorFiles, IOperatorFiles, IWorkoutFiles, IWorkoutFilesResponse, IWorkoutInitialGlobalFilesResponse}