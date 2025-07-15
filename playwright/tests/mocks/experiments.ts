const baseMock = {
    flags: {
        age: {
            enabled: true,
            young: {
                from: 0,
                to: 21,
            },
            adult: {
                from: 22,
                to: 68,
            },
            old: {
                from: 69,
                to: 99,
            },
        },
    },
};

const oldMock = {
    ...baseMock,
    flags: {
        age: {
            ...baseMock.flags.age,
            oldFrom: 23,
            youngFrom: 22,
        },
    },
};

const youngMock = {
    ...baseMock,
    flags: {
        age: {
            ...baseMock.flags.age,
            oldFrom: 24,
            youngFrom: 23,
        },
    },
};

export { oldMock, youngMock };
