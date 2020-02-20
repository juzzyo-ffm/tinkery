import requests
import sys
from bs4 import BeautifulSoup

# give a list of urls representing abc regions, grab the 'primary' destination,
# and associated locations for that region
urls = [
'https://www.abc.net.au/radio/adelaide/weather/',
'https://www.abc.net.au/radio/brisbane/weather/',
'https://www.abc.net.au/radio/canberra/weather/',
'https://www.abc.net.au/radio/darwin/weather/',
'https://www.abc.net.au/radio/hobart/weather/',
'https://www.abc.net.au/radio/melbourne/weather/',
'https://www.abc.net.au/radio/perth/weather/',
'https://www.abc.net.au/radio/sydney/weather/',
'https://www.abc.net.au/radio/alicesprings/weather/',
'https://www.abc.net.au/radio/ballarat/weather/',
'https://www.abc.net.au/radio/brokenhill/weather/',
'https://www.abc.net.au/radio/capricornia/weather/',
'https://www.abc.net.au/radio/centralcoast/weather/',
'https://www.abc.net.au/radio/centralvic/weather/',
'https://www.abc.net.au/radio/centralwest/weather/',
'https://www.abc.net.au/radio/coffscoast/weather/',
'https://www.abc.net.au/radio/esperance/weather/',
'https://www.abc.net.au/radio/eyre/weather/',
'https://www.abc.net.au/radio/farnorth/weather/',
'https://www.abc.net.au/radio/gippsland/weather/',
'https://www.abc.net.au/radio/goldcoast/weather/',
'https://www.abc.net.au/radio/goldfields/weather/',
'https://www.abc.net.au/radio/goulburnmurray/weather/',
'https://www.abc.net.au/radio/greatsouthern/weather/',
'https://www.abc.net.au/radio/illawarra/weather/',
'https://www.abc.net.au/radio/katherine/weather/',
'https://www.abc.net.au/radio/kimberley/weather/',
'https://www.abc.net.au/radio/midnorthcoast/weather/',
'https://www.abc.net.au/radio/milduraswanhill/weather/',
'https://www.abc.net.au/radio/newcastle/weather/',
'https://www.abc.net.au/radio/newengland/weather/',
'https://www.abc.net.au/radio/northandwest/weather/',
'https://www.abc.net.au/radio/northcoast/weather/',
'https://www.abc.net.au/radio/northqld/weather/',
'https://www.abc.net.au/radio/northtas/weather/',
'https://www.abc.net.au/radio/northwest/weather/',
'https://www.abc.net.au/radio/pilbara/weather/',
'https://www.abc.net.au/radio/riverina/weather/',
'https://www.abc.net.au/radio/riverland/weather/',
'https://www.abc.net.au/radio/shepparton/weather/',
'https://www.abc.net.au/radio/southeastnsw/weather/',
'https://www.abc.net.au/radio/southeastsa/weather/',
'https://www.abc.net.au/radio/southqld/weather/',
'https://www.abc.net.au/radio/southwestvic/weather/',
'https://www.abc.net.au/radio/southwestwa/weather/',
'https://www.abc.net.au/radio/sunshine/weather/',
'https://www.abc.net.au/radio/tropic/weather/',
'https://www.abc.net.au/radio/upperhunter/weather/',
'https://www.abc.net.au/radio/westernplains/weather/',
'https://www.abc.net.au/radio/wimmera/weather/',
'https://www.abc.net.au/radio/westqld/weather/',
'https://www.abc.net.au/radio/wheatbelt/weather/',
'https://www.abc.net.au/radio/widebay/weather/'
]
output = ''

# create array of suburb names
# output = '[\n'
# for url in urls:
#     page = requests.get(url)
#
#     soup = BeautifulSoup(page.content, 'html.parser')
#
#     # get associated locations
#     associated_locations = soup.select('.dropdown-menu')[0].find_all('a')
#     for c in associated_locations:
#         loc = c['data-name']
#         output += "\"" + loc.replace(" ", "-") + '\",\n'
#
# output += ']\n'
# orig_stdout = sys.stdout
# with open('town_names_radio.txt', 'w') as f:
#     sys.stdout = f
#     print(output)
#
# sys.stdout = orig_stdout


# existing radio urls to primary location mapping
# for url in urls:
#     page = requests.get(url)
#
#     soup = BeautifulSoup(page.content, 'html.parser')
#
#     # get the primary location
#     primary_location = soup.select('.label')[0].get_text()
#     output += url + "\t" + primary_location.replace(" ", "-") + "\n"
#
# # print the output to a new file
# orig_stdout = sys.stdout
# with open('url_to_primary.txt', 'w') as f:
#     sys.stdout = f
#     print(output)
#
# sys.stdout = orig_stdout


# all location urls
for url in urls:
    page = requests.get(url)

    soup = BeautifulSoup(page.content, 'html.parser')

    # get the primary location
    primary_location = soup.select('.label')[0].get_text()

    # get associated locations
    associated_locations = soup.select('.dropdown-menu')[0].find_all('a')
    for c in associated_locations:
        loc = c['data-name']
        output += url + "?town=" + loc.replace(" ", "%20") + "\n"

    output += '\n'

# print the output to a new file
orig_stdout = sys.stdout
with open('radio_location_urls.txt', 'w') as f:
    sys.stdout = f
    print(output)

sys.stdout = orig_stdout

# tabbed data
# for url in urls:
#     page = requests.get(url)
#
#     soup = BeautifulSoup(page.content, 'html.parser')
#
#     # get the primary location
#     primary_location = soup.select('.label')[0].get_text()
#     output += 'URL: ' + url + '\n'
#     output += 'PRIMARY LOCATION: ' + primary_location + '\n'
#     output += primary_location + "\t" + url + "?town=" + primary_location.replace(" ", "%20") + "\n"
#
#     # get associated locations
#     associated_locations = soup.select('.dropdown-menu')[0].find_all('a')
#     for c in associated_locations:
#         loc = c['data-name']
#         if loc != primary_location:
#             output += loc + '\t' + url + "?town=" + loc.replace(" ", "%20") + "\n"
#
#     output += '\n'
#
# # print the output to a new file
# orig_stdout = sys.stdout
# with open('out.txt', 'w') as f:
#     # with open('town_names_radio.txt', 'w') as f:
#     sys.stdout = f
#     print(output)
#
# sys.stdout = orig_stdout


