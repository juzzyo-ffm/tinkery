# Radio location mapping for abc Weater

## Process
- Scrape location names and primary location from abc radio regional urls using python/beautiful soup
- generate a dictionary of apollo place names, ids and generated urls using node
- create two files, one of primary place names for regions, and a list of all place names
- preliminary match of radio place names to apollow dictionary
- sort resulting file to identify mismatches, of which there are many
- manually go through place misses and cross reference place names in existing radio urls with actual locations (in region from url), and google maps. Find the nearest place that exists in apollo data. Update text files accordingly.
- re-run matching scripts. 
- result is two files that match the order of the input files. Together this creates a mapping of old radio urls to proposed new abc weather urls for both regional primary locations and all (query string) locations. i.e. radio/region/weather/?town=Blarg

Output can be seen in ./weather_urls.xlsx

