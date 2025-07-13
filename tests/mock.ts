export const EXPERIMENTS_API = 'https://api.yavshok.ru/experiments';

export const mockYoung = {
  flags: {
    age: {
      enabled: true,
      young: { from: 0, to: 21 },
      adult: { from: 22, to: 68 },
      old: { from: 69, to: 99 },
      youngFrom: 0
    },
  },
};

export const mockAdult = {
  flags: {
    age: {
      enabled: true,
      young: { from: 0, to: 21 },
      adult: { from: 22, to: 68 },
      old: { from: 69, to: 99 },
      youngFrom: 0
    },
  },
};

export const mockOld = {
  flags: {
    age: {
      enabled: true,
      young: { from: 0, to: 21 },
      adult: { from: 22, to: 68 },
      old: { from: 69, to: 99 },
      oldFrom: 0,
    },
  },
};
