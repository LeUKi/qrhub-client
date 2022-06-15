const initdata = {
    static: {
        type: "static",
        string: "TEST",
    },
    forNum: {
        type: "forNum",
        step: 1,
        start: 1,
        end: 9,
        stringlen: 1,
        strinfill: "0",
    },
    forABC: {
        type: "forABC",
        start: "A",
        end: "B",
    },
    YYYY: {
        type: "YYYY",
    },
    YY: {
        type: "YY",
    },
    MM: {
        type: "MM",
    },
    DD: {
        type: "DD",
    },
    HH: {
        type: "HH",
    },
    hh: {
        type: "hh",
    },
    mm: {
        type: "mm",
    },
    ss: {
        type: "ss",
    },
}
const type2init = (type) => {
    return {
        ...initdata[type],
        id: new Date().getTime()
    }
}

export default type2init;