import requests

def fetchPokeData():
    try:
        response = requests.get("https://pokeapi.co/api/v2/pokemon")
        response.raise_for_status()  # throws an error for 4xx/5xx
        data = response.json()
        print(data)
        return response.json()
    except Exception as error:
        print("Error:", error)
