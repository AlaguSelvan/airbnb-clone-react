module.exports = {
    normalizeErrors: function(errors) {
        let normalizeErrors = []
        for (let property in errors) {
            if (errors.hasOwnProperty(property)) {
                normalizeErrors.push({ tittle: property, detail: errors[property].message})
            }
        }
        return normalizeErrors
    }
}