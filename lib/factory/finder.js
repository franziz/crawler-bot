var CrawlerMetaFinder = require("../finder/crawlerMeta")

module.exports = class FinderFactory{
	constructor(){
		this.CRAWLER_META = 0
	}

	getFinder(finder_name){
		if(finder_name == this.CRAWLER_META){
			return new CrawlerMetaFinder()
		}
	}
}