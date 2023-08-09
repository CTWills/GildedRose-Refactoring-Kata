const {Shop, Item, updateQuality } = require("../src/gilded_rose");

const items = [
  new Item("Aged Brie", 0, 0),
  new Item("Sulfuras, Hand of Ragnaros", 0, 0),
  new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0),
  new Item("Muffin", 5, 10),
  new Item("Spinach", 1, 3)
]

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
})
  it("quality of items should never be negative" , () => {
    const shop = new Shop(items)
    shop.updateQuality();
    shop.items.forEach(element => {
      expect(element.quality).toBeGreaterThanOrEqual(0)
    });
  });

