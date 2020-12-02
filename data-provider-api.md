![defistation](https://user-images.githubusercontent.com/34641838/100820703-2248d480-3492-11eb-8ac5-69149d08f4dd.png)
<h1 align="center">
    Defistation Data Provider REST API
</h1>

## Introduction

Data Provider API is a tool created for DeFi service providers to efficiently update TVL data to Defistation.

### URL Summary

In order to have your real-time TVL data displayed on Defistation, you must be issued an ID and API Key first. Please fill out the [Apply to be listed](https://www.defistation.io/projects) form and wait for a Defistation representative to reach back out after the initial screening process.
To expedite the listing process, please make sure to provide as much detail as possible and complete the required fields in the application form.
After review, Defistation will contact your team member through the contact info provided in the application. We will invite you to a slack group through the e-mail ID you provide in the application to proceed with the listing process.
Once you join the Slack group, we will issue and individually send your project’s own ID & API Key as Basic Auth type through direct message.
You must enter the header in the following form: ‘Authorization: Basic XXXX…’.
The base URL for our API: `https://api.defistation.io/dataProvider`. 


| Resource                                              | GET                                                 | POST                                  | PUT                               | DELETE                                      |
| ----------------------------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- | --------------------------------- |
| /tvl                                         | N/A                                                | Input a new TVL | N/A                               | N/A                                         |
| /tvl?from={from-timestamp}&to={to-timestamp} | Returns a list of TVL defi service provider posted | N/A             | N/A                               | N/A                                         |

## Add your TVL

The "tvl" and "bnb" values must be entered. In "data", you can freely input token and read contract method information related to all contract addresses belonging to TVL so that TVL can be verified at Defistation. There are no restrictions on the structure of the data contents. The data.pairEntities below is an example and doesn't have to be like this. However, all TVL related Contract Addresses must be entered so that TVL figures can be displayed. 

You can enter data 10 minutes before every hour (00:50, 01:50, 02:50, ..., 23:50). (24 times / 1 day)

```
// Request (LP)
curl -X POST \
  https://api.defistation.io/dataProvider/tvl \
  -H 'Authorization: Basic Ym9veW91bjE6ZjI0OWJkMjAtMzM5My0xMWViLWJlZmQtMjM0Yjg4ZDIzXXXX' \
  -H 'Content-Type: application/json' \
  -d '{
    "tvl": 261098389,
    "bnb": 717048.6336811137,
    "data": {
        "pairEntities": [
            {
                "id": "0x00201101f5fd2cba32e6d3cf7d431e4475b16d3e",
                "token0": {
                    "symbol": "BUSD"
                },
                "token1": {
                    "symbol": "WBNB"
                }
            },
            {
                "id": "0x00af854f8e5522c1f0c22f7dd5f37cdb9ad1dd71",
                "token0": {
                    "symbol": "LINK"
                },
                "token1": {
                    "symbol": "WBNB"
                }
            }
        ]
    }
}'

// Request (Vault)
curl -X POST \
  https://api.defistation.io/dataProvider/tvl \
  -H 'Authorization: Basic Ym9veW91bjE6ZjI0OWJkMjAtMzM5My0xMWViLWJlZmQtMjM0Yjg4ZDIzXXXX' \
  -H 'Content-Type: application/json' \
  -d '{
    "tvl": 261098389,
    "bnb": 717048.6336811137,
    "data": {
        "pairs": [
            {
                "id": "0x00201101f5fd2cba32e6d3cf7d431e4475b16d3e",
                "token0": {
                    "symbol": "BUSD"
                }
            },
            {
                "id": "0x00af854f8e5522c1f0c22f7dd5f37cdb9ad1dd71",
                "token0": {
                    "symbol": "LINK"
                }
            }
        ]
    }
}'

// Request (Lending)
curl -X POST \
  https://api.defistation.io/dataProvider/tvl \
  -H 'Authorization: Basic Ym9veW91bjE6ZjI0OWJkMjAtMzM5My0xMWViLWJlZmQtMjM0Yjg4ZDIzXXXX' \
  -H 'Content-Type: application/json' \
  -d '{
    "tvl": 261098389,
    "bnb": 717048.6336811137,
    "data": {
        "NiceSwap": {
            "contractAddress": "0x00201101f5fd2cba32e6d3cf7d431e4475b16d3e",
            "tokens": ["BTCB", "USDT", "BUSD", "ETH", "DOT", "XRP", "LTC", "BCH", "EOS", "DAI", "ONT", "LINK", "YFII", "BAND", "ZEC", "XTZ", "FIL", "ATOM", "ADA", "FREE", "PROPEL", "FOR"]
        }
    }
}'
```

```
// Response
Status 200 OK

{
    "status": "success",
    "data": {
        "pairEntities": [
            {
                "id": "0x00201101f5fd2cba32e6d3cf7d431e4475b16d3e",
                "token0": {
                    "symbol": "BUSD"
                },
                "token1": {
                    "symbol": "WBNB"
                }
            },
            {
                "id": "0x00af854f8e5522c1f0c22f7dd5f37cdb9ad1dd71",
                "token0": {
                    "symbol": "LINK"
                },
                "token1": {
                    "symbol": "WBNB"
                }
            }
        ]
    },
    "message": null
}
```

## Check your TVL

You can check the TVL data entered in Defistation with GET TVL API. If you do not enter from, to timestamp values, the latest 24-hour data is displayed by default.

```
// Request
curl -X GET \
  'https://api.defistation.io/dataProvider/tvl?from=1502766805&to=1606803480' \
  -H 'Authorization: Basic Ym9veW91bjE6ZjI0OWJkMjAtMzM5My0xMWViLWJlZmQtMjM0Yjg4ZDIzXXXX'
```

```
// Response
Status 200 OK

[
    {
        "name": "pancake",
        "bnb": 1429018.6336811137,
        "totalValue": 103653764,
        "data": "{\"pairEntities\":[{\"id\":\"0x00201101f5fd2cba32e6d3cf7d431e4475b16d3e\",\"token0\":{\"symbol\":\"BUSD\"},\"token1\":{\"symbol\":\"WBNB\"}},{\"id\":\"0x00af854f8e5522c1f0c22f7dd5f37cdb9ad1dd71\",\"token0\":{\"symbol\":\"LINK\"},\"token1\":{\"symbol\":\"WBNB\"}}]}",
        "timestamp": 1606803480
    }
]
```

## Defistation Services and Community

- [Defistation Website](https://www.defistation.io/)
- [Apply to be listed on Defistation](https://docs.google.com/forms/d/e/1FAIpQLSderGL_rQr3SV6DC0b-wKfAHm3CTUabGktIjxUOctv_gscxfQ/viewform)
