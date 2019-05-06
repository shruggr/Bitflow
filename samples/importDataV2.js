module.exports = function(context) {
    Object.assign(context.state, context.data);
    return 0;
}