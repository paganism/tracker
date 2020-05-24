from django.shortcuts import render


from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Issue
from .serializers import *


@api_view(['GET', 'POST'])
def issues_list(request):
    """ List  issues, or create a new issue """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        issues = Issue.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(issues, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = IssueSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/issues/?page=' + str(nextPage), 'prevlink': '/api/issues/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def issues_detail(request, pk):
    """ Retrieve, update or delete an issue by id/pk """
    try:
        issue = Issue.objects.get(pk=pk)
    except Issue.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = IssueSerializer(issue,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = IssueSerializer(issue, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        issue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
