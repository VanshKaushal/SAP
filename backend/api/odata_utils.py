from typing import Optional, Type, Any
from fastapi import Request
from sqlalchemy.orm import Query
from sqlalchemy import asc, desc

def apply_odata_query(query: Query, model: Type[Any], request: Request) -> Query:
    """
    Parses simple OData V4 query options ($filter, $top, $skip, $orderby) 
    and applies them to a SQLAlchemy query.
    """
    query_params = request.query_params

    # $filter (Basic implementation: field eq 'value' or field eq number)
    filter_param = query_params.get("$filter")
    if filter_param:
        # Simplistic parsing for demonstration: "status eq 'PENDING'"
        parts = filter_param.split(" eq ")
        if len(parts) == 2:
            field_name = parts[0].strip()
            value = parts[1].strip().strip("'").strip('"')
            if hasattr(model, field_name):
                column = getattr(model, field_name)
                query = query.filter(column == value)

    # $orderby (e.g., "created_at desc")
    orderby_param = query_params.get("$orderby")
    if orderby_param:
        parts = orderby_param.split()
        field_name = parts[0].strip()
        direction = parts[1].strip().lower() if len(parts) > 1 else "asc"
        if hasattr(model, field_name):
            column = getattr(model, field_name)
            if direction == "desc":
                query = query.order_by(desc(column))
            else:
                query = query.order_by(asc(column))

    # $skip
    skip_param = query_params.get("$skip")
    if skip_param and skip_param.isdigit():
        query = query.offset(int(skip_param))

    # $top
    top_param = query_params.get("$top")
    if top_param and top_param.isdigit():
        query = query.limit(int(top_param))

    return query
