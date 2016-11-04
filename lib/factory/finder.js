var CrawlersMetaFinder = require("../finder/crawlersMeta")

class FinderFactory{
	constructor(){
		this.CRAWLERS_META = 0;
	}

	get_finder(finder_name){
		if(finder_name === this.CRAWLERS_META){
			return new CrawlersMetaFinder()
		}
	}
}

module.exports = FinderFactory