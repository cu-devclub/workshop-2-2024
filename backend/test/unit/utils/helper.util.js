
const helper = require('../../../src/utils/helper.util')

describe('Helper Utils test', () => {
  describe('emptyOrRows', () => {
    it('Should get empty array if rows is empty', () => {
      expect(helper.emptyOrRows()).toEqual([]);

    });
    it('Should get arrary if rows is filled', () => {
      expect(helper.emptyOrRows([1])).toEqual([1]);

    });    
  });

  describe('id validation', () => {
    it('Should get true', () => {
      expect(helper.validID("123")).toEqual(true);

    });
    it('Should get false input NaN', () => {
      expect(helper.validID("abc")).toEqual(false);

    });
    it('Should get false input null', () => {
      expect(helper.validID(null)).toEqual(false);

    }); 
  });
});