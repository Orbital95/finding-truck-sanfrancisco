from django.http import JsonResponse
import csv
import operator
import numpy as np
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

def parse_csv_file(file_path):
    data = []
    try:
        with open(file_path, 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                data.append(row)
    except FileNotFoundError:
        # Handle file not found error
        return None
    except csv.Error:
        # Handle CSV format error
        return None
    return data

def find_trucks(data, location, number):
    # Create a new list with squared distances as an additional field
    data_with_distances = [[*row, np.square(float(row[14]) - float(location['lat'])) + np.square(float(row[15]) - float(location['lng']))] for row in data[1:]]
    
    # Sort the new list by the 30th field (index 29)
    sorted_data = sorted(data_with_distances, key=operator.itemgetter(29))
    
    # Filter the sorted list to include only rows with 'Truck' in the 3rd field (index 2)
    trucks = [row for row in sorted_data if row[2] == 'Truck']
    
    # Return the first 'number' rows from the filtered list
    return trucks[:number]

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def truck_view(request):
    if request.method == 'GET':
        location = {}
        # Get the position information from query parameters
        location['lat'] = request.GET.get('lat')
        location['lng'] = request.GET.get('lng')

        # Parse the file 
        file_path = 'food-truck-data.csv'        
        data = parse_csv_file(file_path)
        if data is None:
            # Handle error when reading CSV file
            response_data = {'status': 'error', 'message': 'Data file does not exist'}        
            return HttpResponse(response_data, status=500)
        
        # Find trucks
        response_data = find_trucks(data, location, 5)
        
        return JsonResponse(response_data, safe=False)
    else:
        # Handle other HTTP methods if needed
        response_data = {'status': 'error', 'message': 'Invalid request method'}
        return JsonResponse(response_data, status=400, safe=False)

