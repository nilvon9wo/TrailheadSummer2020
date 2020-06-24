export function reduceErrors(errors) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        errors
            .filter((error) => !!error)
            .map((error) => (Array.isArray(error.body))
                ? error.body.map((e) => e.message)
                : (error.body && typeof error.body.message === 'string')
                    ? error.body.message
                    : (typeof error.message === 'string')
                        ? error.message
                        : error.statusText
            )
            .reduce((previous, current) => previous.concat(current), [])
            .filter((message) => !!message)
    );
}