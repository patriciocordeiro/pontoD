module.exports = {
    // max time to work (wil consider extra time if is greather tanh this)
    maxTimeToWork: {
        hour: 0,
        min: 1,
        sec: 0
    },
    //min time to work (will consider no work if less than this)
    minTimeToWork: {
        hour: 1,
        min: 0,
        sec: 0
    },
    //max time to "bater ponto" (will consider delay after this)
    maxInTime: {
        turno1: {
            hour: 8,
            min: 15,
            sec: 59
        },
        turno2: {
            hour: 19,
            min: 18,
            sec: 59
        }

    },
    //max time to "bater ponto" (will consider delay after this)
    //    maxInTimeInTurno2: {
    //        hour: 19,
    //        min: 15,
    //        sec: 59
    //    }
};
