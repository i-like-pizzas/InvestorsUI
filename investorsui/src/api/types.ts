export interface validationError {
    detail: validationErrorDetail[] | undefined
}

export interface validationErrorDetail {
    loc: unknown[] | undefined,
    msg: string | undefined,
    type: string | undefined
}