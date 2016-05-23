module.exports = {
    // max time to work (wil consider extra time if is greather tanh this)
    maxTimeToWork: {
        hour: 4,
        min: 0,
        sec: 0
    },
    //min time to work (will consider no work if less than this)
    minTimeToWork: {
        hour: 1,
        min: 0,
        sec: 0
    },
    //max time to "bater ponto" (will consider delay after this)
    maxInTimeInTurno1: {
        hour: 8,
        min: 15,
        sec: 59
    },
    //max time to "bater ponto" (will consider delay after this)
    maxInTimeInTurno2: {
        hour: 14,
        min: 15,
        sec: 59
    }
}
