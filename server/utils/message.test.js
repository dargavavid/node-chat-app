const expect = require('expect');
const generateMessage = require('./message');

describe('Generate message', () => {
    it('should generate the correct message object', () => {
        const from = 'Dave', text = 'kek';
        const testObj  = generateMessage(from, text);
        
        expect(testObj.createdAt).toBeA('number');
        expect(testObj).toInclude({from, text});
        // expect(testObj.from).toExist();
        // expect(testObj.text).toExist();
    });
});