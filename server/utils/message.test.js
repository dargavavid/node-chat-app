const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage function', () => {
    it('should generate the correct message object', () => {
        const from = 'Dave', text = 'kek';
        const testObj  = generateMessage(from, text);

        expect(testObj.createdAt).toBeA('number');
        expect(testObj).toInclude({from, text});
        // expect(testObj.from).toExist();
        // expect(testObj.text).toExist();
    });
});

describe('generateLocationMessage function', () => {
    it('should generate correct location message object', () => {
        const from = 'Dave', lat = 1, long = 1;
        const url = 'https://www.google.com/maps?q=1,1';
        const locationMessage = generateLocationMessage(from, lat, long);
        expect(locationMessage).toInclude({from, url});
        expect(locationMessage.from).toBeA('string');
        expect(locationMessage.url).toBeA('string');
        expect(locationMessage.createdAt).toBeA('number');
    });
});