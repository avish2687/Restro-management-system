"""
Database module for handling Supabase connection and operations.
"""
import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import Optional, Dict, Any, List

# Load environment variables
load_dotenv()

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Validate environment variables
if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL environment variable is not set")
if not SUPABASE_KEY:
    raise ValueError("SUPABASE_KEY environment variable is not set")

# Create Supabase client
try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    raise ConnectionError(f"Failed to create Supabase client: {str(e)}")


def get_supabase_client() -> Client:
    """
    Get the Supabase client instance.
    
    Returns:
        Client: The Supabase client instance
    """
    return supabase


def test_connection() -> bool:
    """
    Test the database connection.
    
    Returns:
        bool: True if connection is successful, False otherwise
    """
    try:
        # Try to query a simple table to test connection
        result = supabase.table('bookings').select('id').limit(1).execute()
        return True
    except Exception as e:
        # Log error but don't print to console in production
        import logging
        logging.error(f"Database connection error: {str(e)}")
        return False


# Database helper functions for common operations

def insert_record(table_name: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Insert a record into a table.
    
    Args:
        table_name: Name of the table
        data: Dictionary containing the data to insert
        
    Returns:
        Dict containing the inserted record
    """
    try:
        result = supabase.table(table_name).insert(data).execute()
        return result.data[0] if result.data else {}
    except Exception as e:
        raise Exception(f"Error inserting record into {table_name}: {str(e)}")


def get_all_records(table_name: str, order_by: Optional[str] = None, 
                   desc: bool = True) -> List[Dict[str, Any]]:
    """
    Get all records from a table.
    
    Args:
        table_name: Name of the table
        order_by: Column name to order by (optional)
        desc: Whether to order descending (default: True)
        
    Returns:
        List of records
    """
    try:
        query = supabase.table(table_name).select('*')
        if order_by:
            query = query.order(order_by, desc=desc)
        result = query.execute()
        return result.data if result.data else []
    except Exception as e:
        raise Exception(f"Error fetching records from {table_name}: {str(e)}")


def get_record_by_id(table_name: str, record_id: int) -> Optional[Dict[str, Any]]:
    """
    Get a single record by ID.
    
    Args:
        table_name: Name of the table
        record_id: ID of the record
        
    Returns:
        Record dictionary or None if not found
    """
    try:
        result = supabase.table(table_name).select('*').eq('id', record_id).execute()
        return result.data[0] if result.data else None
    except Exception as e:
        raise Exception(f"Error fetching record from {table_name}: {str(e)}")


def update_record(table_name: str, record_id: int, data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Update a record in a table.
    
    Args:
        table_name: Name of the table
        record_id: ID of the record to update
        data: Dictionary containing the data to update
        
    Returns:
        Dict containing the updated record
    """
    try:
        result = supabase.table(table_name).update(data).eq('id', record_id).execute()
        return result.data[0] if result.data else {}
    except Exception as e:
        raise Exception(f"Error updating record in {table_name}: {str(e)}")


def delete_record(table_name: str, record_id: int) -> bool:
    """
    Delete a record from a table.
    
    Args:
        table_name: Name of the table
        record_id: ID of the record to delete
        
    Returns:
        True if deletion was successful
    """
    try:
        result = supabase.table(table_name).delete().eq('id', record_id).execute()
        return True
    except Exception as e:
        raise Exception(f"Error deleting record from {table_name}: {str(e)}")


def filter_records(table_name: str, column: str, value: Any) -> List[Dict[str, Any]]:
    """
    Filter records by a column value.
    
    Args:
        table_name: Name of the table
        column: Column name to filter by
        value: Value to filter for
        
    Returns:
        List of matching records
    """
    try:
        result = supabase.table(table_name).select('*').eq(column, value).execute()
        return result.data if result.data else []
    except Exception as e:
        raise Exception(f"Error filtering records from {table_name}: {str(e)}")
