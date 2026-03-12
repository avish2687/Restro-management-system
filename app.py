from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from supabase import create_client, Client
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, 
            static_folder='.',
            template_folder='.')
CORS(app)

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============== BOOKING ENDPOINTS ==============

@app.route('/api/booking', methods=['POST'])
def create_booking():
    """Create a new table booking"""
    try:
        data = request.get_json()
        
        booking_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'datetime': data.get('datetime'),
            'people': data.get('people'),
            'special_request': data.get('special_request', ''),
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        
        result = supabase.table('bookings').insert(booking_data).execute()
        
        return jsonify({
            'success': True,
            'message': 'Booking created successfully!',
            'data': result.data
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/bookings', methods=['GET'])
def get_all_bookings():
    """Get all bookings (Admin)"""
    try:
        result = supabase.table('bookings').select('*').order('created_at', desc=True).execute()
        
        return jsonify({
            'success': True,
            'data': result.data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/booking/<int:booking_id>', methods=['GET'])
def get_booking(booking_id):
    """Get single booking by ID"""
    try:
        result = supabase.table('bookings').select('*').eq('id', booking_id).execute()
        
        if len(result.data) == 0:
            return jsonify({
                'success': False,
                'message': 'Booking not found'
            }), 404
            
        return jsonify({
            'success': True,
            'data': result.data[0]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/booking/<int:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    """Update booking status"""
    try:
        data = request.get_json()
        
        update_data = {
            'status': data.get('status', 'pending')
        }
        
        result = supabase.table('bookings').update(update_data).eq('id', booking_id).execute()
        
        return jsonify({
            'success': True,
            'message': 'Booking updated successfully',
            'data': result.data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/booking/<int:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    """Delete a booking"""
    try:
        result = supabase.table('bookings').delete().eq('id', booking_id).execute()
        
        return jsonify({
            'success': True,
            'message': 'Booking deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


# ============== MENU ENDPOINTS ==============

@app.route('/api/menu', methods=['GET'])
def get_menu():
    """Get all menu items"""
    try:
        category = request.args.get('category')
        
        query = supabase.table('menu_items').select('*')
        
        if category:
            query = query.eq('category', category)
            
        result = query.execute()
        
        return jsonify({
            'success': True,
            'data': result.data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/menu', methods=['POST'])
def create_menu_item():
    """Create new menu item (Admin)"""
    try:
        data = request.get_json()
        
        menu_data = {
            'name': data.get('name'),
            'description': data.get('description'),
            'price': data.get('price'),
            'category': data.get('category'),
            'image_url': data.get('image_url', ''),
            'available': data.get('available', True)
        }
        
        result = supabase.table('menu_items').insert(menu_data).execute()
        
        return jsonify({
            'success': True,
            'message': 'Menu item created successfully',
            'data': result.data
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/menu/<int:item_id>', methods=['PUT'])
def update_menu_item(item_id):
    """Update menu item (Admin)"""
    try:
        data = request.get_json()
        
        result = supabase.table('menu_items').update(data).eq('id', item_id).execute()
        
        return jsonify({
            'success': True,
            'message': 'Menu item updated successfully',
            'data': result.data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/menu/<int:item_id>', methods=['DELETE'])
def delete_menu_item(item_id):
    """Delete menu item (Admin)"""
    try:
        result = supabase.table('menu_items').delete().eq('id', item_id).execute()
        
        return jsonify({
            'success': True,
            'message': 'Menu item deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


# ============== CONTACT/NEWSLETTER ENDPOINTS ==============

@app.route('/api/contact', methods=['POST'])
def create_contact():
    """Handle contact form submission"""
    try:
        data = request.get_json()
        
        contact_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'subject': data.get('subject', ''),
            'message': data.get('message'),
            'created_at': datetime.now().isoformat()
        }
        
        result = supabase.table('contacts').insert(contact_data).execute()
        
        return jsonify({
            'success': True,
            'message': 'Message sent successfully!',
            'data': result.data
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/newsletter', methods=['POST'])
def subscribe_newsletter():
    """Newsletter subscription"""
    try:
        data = request.get_json()
        
        newsletter_data = {
            'email': data.get('email'),
            'subscribed_at': datetime.now().isoformat()
        }
        
        result = supabase.table('newsletter').insert(newsletter_data).execute()
        
        return jsonify({
            'success': True,
            'message': 'Successfully subscribed to newsletter!'
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


# ============== ORDERS ENDPOINTS ==============

@app.route('/api/order', methods=['POST'])
def create_order():
    """Create a new order"""
    try:
        data = request.get_json()
        
        order_data = {
            'customer_name': data.get('customer_name'),
            'customer_email': data.get('customer_email'),
            'customer_phone': data.get('customer_phone'),
            'items': data.get('items'),  # JSON array of items
            'total_amount': data.get('total_amount'),
            'delivery_address': data.get('delivery_address', ''),
            'order_type': data.get('order_type', 'delivery'),  # delivery/pickup
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        
        result = supabase.table('orders').insert(order_data).execute()
        
        return jsonify({
            'success': True,
            'message': 'Order placed successfully!',
            'data': result.data
        }), 201
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Get all orders (Admin)"""
    try:
        result = supabase.table('orders').select('*').order('created_at', desc=True).execute()
        
        return jsonify({
            'success': True,
            'data': result.data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


@app.route('/api/order/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    """Update order status"""
    try:
        data = request.get_json()
        
        update_data = {
            'status': data.get('status')
        }
        
        result = supabase.table('orders').update(update_data).eq('id', order_id).execute()
        
        return jsonify({
            'success': True,
            'message': 'Order status updated',
            'data': result.data
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 400


# ============== HEALTH CHECK ==============

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Restaurant API is running'
    }), 200


# ============== SERVE HTML ==============

@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('.', path)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)