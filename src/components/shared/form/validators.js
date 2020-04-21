const minLength = min => value => 
                    value && value.length < min 
                    ? `Must be ${min} characters or more` 
                    : undefined

export const required = value => (
    value ? undefined : 'this input is required'
)

export const minLength4 = minLength(4)