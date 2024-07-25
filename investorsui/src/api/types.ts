export interface ValidationError {
    detail: ValidationErrorDetail[] | undefined
}

export interface ValidationErrorDetail {
    loc: unknown[] | undefined,
    msg: string | undefined,
    type: string | undefined
}