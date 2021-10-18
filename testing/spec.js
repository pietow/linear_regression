const stats = require('../stats.js')

describe('mean function', () => {
  it('mean of array', () => {
    expect(stats.mean([1,2,3])).toEqual(2);
  });
});
describe('mean function', () => {
  it('mean of array', () => {
    expect(stats.mean([1,2])).toEqual(1.5);
  });
});

describe('variance function', () => {
  it('variance of array', () => {
    expect(stats.variance([10, 12, 23, 23, 16, 23, 21, 16]).toFixed(4)).toEqual('27.4286');
  });
});

describe('stdev function', () => {
  it('standard deviation of array', () => {
    expect(stats.stddev([1,2,1]).toFixed(4)).toEqual('0.5774');
  });
});
describe('stdev function', () => {
  it('standard deviation of array', () => {
    expect(stats.stddev([10, 12, 23, 23, 16, 23, 21, 16]).toFixed(4)).toEqual('5.2372');
  });
});

describe('cov function', () => {
  it('covariance of two arrays', () => {
    expect(stats.cov([10, 12, 23], [10, 12, 23])).toEqual(stats.variance([10, 12, 23]));
  });
});
describe('cov function', () => {
  it('covariance of two arrays', () => {
    expect(stats.cov([5, 12, 4, 6], [2, 8, 12, 4]).toFixed(4)).toEqual("0.8333");
  });
});

