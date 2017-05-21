describe('thousand-suffix', function() {

  describe('filter', function() {
    var filter = require('./thousand-suffix.filter.js')();

    it('should transform number(larger 999) to short form with suffix', function() {
      expect(filter(110, 1)).toBe(110);
      expect(filter(999, 1)).toBe(999);
      expect(filter(1000, 1)).toBe('1.0K');
      expect(filter(1100, 1)).toBe('1.1K');
      expect(filter(8820, 1)).toBe('8.8K');
      expect(filter(1100000, 1)).toBe('1.1M');
      expect(filter(11890000, 1)).toBe('11.9M');      
    });
  });
});