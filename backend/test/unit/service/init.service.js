
const init = require('../../../src/services/init.service')

describe('init service test', () => {
  describe('Create table if not exist', () => {
    it('Should get Database initialization complete.', async () => {
      expect(await init.database()).toEqual("Database initialization complete.");

    });  
  });
});