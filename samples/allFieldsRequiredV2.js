module.exports = function(context) {
    for(let field of context.schema.fields) {
        if(!context.data[field.key]) return 1;
    }
    return 2;
}