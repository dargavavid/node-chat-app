const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString function', () => {
    it('should recognize valid string', () => {
        const val = 'abc  ';
        expect(isRealString(val)).toBe(true);
    });

    it('should reject non-string', () => {
        const val = 123;
        expect(isRealString(val)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const val = '     ';
        expect(isRealString(val)).toBe(false);
    });
});