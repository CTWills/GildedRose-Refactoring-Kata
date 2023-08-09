class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
    
    incrementQuality = (inc) => this.quality = Math.min(this.quality + inc, 50);
    decrementQuality = (inc) => this.quality = Math.max(this.quality - inc, 0);

    isAgedBrie = () => this.name === "Aged Brie";
    isSulfuras = () => this.name.includes("Sulfuras");
    isBackstagePass = () => this.name.includes("Backstage");
    isOutOfDate = () => this.sellIn <= 0;
    isNormalItem = () => !this.isAgedBrie() && !this.isSulfuras() && !this.isBackstagePass();

    updateNormalItem = () => this.isOutOfDate() ? this.decrementQuality(2) : this.decrementQuality(1)
    updateBrie = () => this.isOutOfDate() ? this.incrementQuality(2) : this.incrementQuality(1)
    updateBackstagePass = () => {
        this.isOutOfDate() && (this.quality = 0);
        this.backStageIsFarOff() && (this.incrementQuality(1));
        this.backStageIsApproaching() && (this.incrementQuality(2));
        this.backStageIsImminent() && (this.incrementQuality(3));
    }

    backStageIsFarOff = () => (this.sellIn > 10);
    backStageIsApproaching = () => (this.sellIn > 5 && this.sellIn <= 10);
    backStageIsImminent = () => (this.sellIn <= 5 && this.sellIn > 0);
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }
    updateQuality() {
        return this.items.map(item => {
            item.isAgedBrie() && item.updateBrie();
            item.isBackstagePass() && item.updateBackstagePass();
            item.isNormalItem() && item.updateNormalItem();
            !item.isSulfuras() && item.sellIn--;
            return item;
        })
    }
}

module.exports = {
    Item,
    Shop
}
