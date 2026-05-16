import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Users, Package, ShoppingBag, BarChart3, Plus, Trash2, CheckCircle, Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { 
    useGetProductsQuery, 
    useCreateProductMutation, 
    useDeleteProductMutation,
    useUpdateProductMutation
} from '../features/api/productsApiSlice';
import { 
    useGetOrdersQuery, 
    useDeliverOrderMutation,
    useUpdateOrderStatusMutation,
    useUpdatePaymentStatusMutation
} from '../features/api/ordersApiSlice';
import { 
    useGetUsersQuery 
} from '../features/api/usersApiSlice';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('overview');

    // Fetch Data
    const { data: productsData, refetch: refetchProducts } = useGetProductsQuery({});
    const { data: ordersData, refetch: refetchOrders } = useGetOrdersQuery();
    const { data: usersData } = useGetUsersQuery();

    // Mutations
    const [createProduct] = useCreateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deliverOrder] = useDeliverOrderMutation();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();
    const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

    const products = productsData?.data || [];
    const orders = ordersData?.data || [];
    const users = usersData?.data || [];

    // Calculate Metrics
    const totalRevenue = orders.reduce((acc, order) => acc + (order.isPaid || order.paymentStatus === 'paid' ? order.totalAmount : 0), 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalProductsCount = products.length;

    // Form State for Add Product
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        brand: '',
        countInStock: '',
        image: ''
    });

    if (!userInfo || userInfo.role !== 'admin') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <div className="bg-error/10 border border-error/20 rounded-2xl p-8 max-w-md mx-auto">
                    <h2 className="text-xl text-error font-semibold mb-2">Access Denied</h2>
                    <p className="text-textMuted mb-6">You do not have permission to access the admin dashboard.</p>
                    <button onClick={() => navigate('/')} className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors">
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            if (editingProductId) {
                await updateProduct({
                    id: editingProductId,
                    ...newProduct,
                    price: Number(newProduct.price),
                    countInStock: Number(newProduct.countInStock),
                    image: newProduct.image || undefined
                }).unwrap();
                toast.success('Product updated successfully');
            } else {
                await createProduct({
                    ...newProduct,
                    price: Number(newProduct.price),
                    countInStock: Number(newProduct.countInStock),
                    images: newProduct.image ? [newProduct.image] : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop']
                }).unwrap();
                toast.success('Product created successfully');
            }
            setShowAddProduct(false);
            setEditingProductId(null);
            setNewProduct({ name: '', price: '', description: '', category: '', brand: '', countInStock: '', image: '' });
            refetchProducts();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id).unwrap();
                toast.success('Product deleted successfully');
                refetchProducts();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const handleDeliverOrder = async (id) => {
        try {
            await deliverOrder(id).unwrap();
            toast.success('Order marked as delivered');
            refetchOrders();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleUpdateOrderStatus = async (id, status) => {
        try {
            await updateOrderStatus({ orderId: id, status }).unwrap();
            toast.success(`Order status updated to ${status}`);
            refetchOrders();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const handleUpdatePaymentStatus = async (id, status) => {
        try {
            await updatePaymentStatus({ orderId: id, status }).unwrap();
            toast.success(`Payment status updated to ${status}`);
            refetchOrders();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-heading font-bold text-white mb-8">Admin Dashboard</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sticky top-24">
                        <nav className="space-y-2">
                            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-accent/20 text-white border border-accent/50' : 'text-textMuted hover:bg-white/5 hover:text-white border border-transparent'}`}>
                                <BarChart3 size={18} /><span>Overview</span>
                            </button>
                            <button onClick={() => setActiveTab('products')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-accent/20 text-white border border-accent/50' : 'text-textMuted hover:bg-white/5 hover:text-white border border-transparent'}`}>
                                <Package size={18} /><span>Products</span>
                            </button>
                            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-accent/20 text-white border border-accent/50' : 'text-textMuted hover:bg-white/5 hover:text-white border border-transparent'}`}>
                                <ShoppingBag size={18} /><span>Orders</span>
                            </button>
                            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-accent/20 text-white border border-accent/50' : 'text-textMuted hover:bg-white/5 hover:text-white border border-transparent'}`}>
                                <Users size={18} /><span>Users</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center"><ShoppingBag size={24} /></div>
                                    </div>
                                    <h3 className="text-white font-bold text-2xl mb-1">{totalOrders}</h3>
                                    <p className="text-textMuted text-sm">Total Orders</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-highlight/20 text-highlight flex items-center justify-center"><BarChart3 size={24} /></div>
                                    </div>
                                    <h3 className="text-white font-bold text-2xl mb-1">₹{totalRevenue.toFixed(2)}</h3>
                                    <p className="text-textMuted text-sm">Total Revenue</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center"><Users size={24} /></div>
                                    </div>
                                    <h3 className="text-white font-bold text-2xl mb-1">{totalUsers}</h3>
                                    <p className="text-textMuted text-sm">Active Users</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-highlight/20 text-highlight flex items-center justify-center"><Package size={24} /></div>
                                    </div>
                                    <h3 className="text-white font-bold text-2xl mb-1">{totalProductsCount}</h3>
                                    <p className="text-textMuted text-sm">Products</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-heading font-bold text-white">Manage Products</h2>
                                <button onClick={() => {
                                    setShowAddProduct(!showAddProduct);
                                    if(showAddProduct) {
                                        setEditingProductId(null);
                                        setNewProduct({ name: '', price: '', description: '', category: '', brand: '', countInStock: '', image: '' });
                                    }
                                }} className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                                    <Plus size={16} className="mr-2" /> {showAddProduct ? 'Cancel' : 'Add Product'}
                                </button>
                            </div>

                            {showAddProduct && (
                                <form onSubmit={handleCreateProduct} className="mb-8 p-6 bg-black/20 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Name" required value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                                    <input type="number" placeholder="Price" required value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                                    <input type="text" placeholder="Brand" required value={newProduct.brand} onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                                    <input type="text" placeholder="Category" required value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                                    <input type="number" placeholder="Count In Stock" required value={newProduct.countInStock} onChange={(e) => setNewProduct({...newProduct, countInStock: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                                    <input type="text" placeholder="Image URL (optional)" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                                    <textarea placeholder="Description" required value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white md:col-span-2"></textarea>
                                    <button type="submit" className="bg-accent hover:bg-accent/90 text-white p-3 rounded-lg md:col-span-2 font-medium">
                                        {editingProductId ? 'Update Product' : 'Create Product'}
                                    </button>
                                </form>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-textMuted text-sm">
                                            <th className="pb-3 font-medium">ID</th>
                                            <th className="pb-3 font-medium">NAME</th>
                                            <th className="pb-3 font-medium">PRICE</th>
                                            <th className="pb-3 font-medium">CATEGORY</th>
                                            <th className="pb-3 font-medium text-right">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {products.map(product => (
                                            <tr key={product._id} className="text-white">
                                                <td className="py-4 text-sm text-textMuted">{product._id.substring(0, 8)}...</td>
                                                <td className="py-4">{product.name}</td>
                                                <td className="py-4">₹{product.price}</td>
                                                <td className="py-4">{product.category?.name || product.category || 'N/A'}</td>
                                                <td className="py-4 text-right flex justify-end space-x-2">
                                                    <button onClick={() => {
                                                        setEditingProductId(product._id);
                                                        setNewProduct({
                                                            name: product.name,
                                                            price: product.price,
                                                            description: product.description,
                                                            category: product.category?.name || product.category || '',
                                                            brand: product.brand,
                                                            countInStock: product.stock,
                                                            image: product.images[0] || ''
                                                        });
                                                        setShowAddProduct(true);
                                                    }} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-colors">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDeleteProduct(product._id)} className="p-2 bg-error/10 hover:bg-error/20 text-error rounded-lg transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="mb-6 border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-heading font-bold text-white">Manage Orders</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-textMuted text-sm">
                                            <th className="pb-3 font-medium">ID</th>
                                            <th className="pb-3 font-medium">USER</th>
                                            <th className="pb-3 font-medium">TOTAL</th>
                                            <th className="pb-3 font-medium">PAID</th>
                                            <th className="pb-3 font-medium">STATUS</th>
                                            <th className="pb-3 font-medium text-right">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {orders.map(order => (
                                            <tr key={order._id} className="text-white">
                                                <td className="py-4 text-sm text-textMuted">{order._id.substring(0, 8)}...</td>
                                                <td className="py-4">{order.user && order.user.name}</td>
                                                <td className="py-4">₹{order.totalAmount}</td>
                                                <td className="py-4">
                                                    <select 
                                                        value={order.paymentStatus || 'pending'}
                                                        onChange={(e) => handleUpdatePaymentStatus(order._id, e.target.value)}
                                                        className={`px-2 py-1.5 rounded-lg text-xs font-medium bg-black/40 border border-white/20 focus:outline-none focus:border-accent capitalize ${
                                                            order.paymentStatus === 'paid' ? 'text-success' : 
                                                            order.paymentStatus === 'failed' ? 'text-error' : 
                                                            order.paymentStatus === 'refunded' ? 'text-textMuted' : 
                                                            'text-error'
                                                        }`}
                                                    >
                                                        <option value="pending" className="text-white">Pending</option>
                                                        <option value="paid" className="text-white">Paid</option>
                                                        <option value="failed" className="text-white">Failed</option>
                                                        <option value="refunded" className="text-white">Refunded</option>
                                                    </select>
                                                </td>
                                                <td className="py-4">
                                                    <select 
                                                        value={order.orderStatus || 'pending'}
                                                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                                        className={`px-2 py-1.5 rounded-lg text-xs font-medium bg-black/40 border border-white/20 focus:outline-none focus:border-accent capitalize ${
                                                            order.orderStatus === 'delivered' ? 'text-success' : 
                                                            order.orderStatus === 'shipped' || order.orderStatus === 'out for delivery' ? 'text-highlight' : 
                                                            order.orderStatus === 'cancelled' ? 'text-error' : 
                                                            'text-yellow-400'
                                                        }`}
                                                    >
                                                        <option value="pending" className="text-white">Pending</option>
                                                        <option value="processing" className="text-white">Processing</option>
                                                        <option value="shipped" className="text-white">Shipped</option>
                                                        <option value="out for delivery" className="text-white">Out for Delivery</option>
                                                        <option value="delivered" className="text-white">Delivered</option>
                                                        <option value="cancelled" className="text-white">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button onClick={() => navigate(`/order/${order._id}`)} className="p-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors inline-block text-xs font-medium">
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="mb-6 border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-heading font-bold text-white">Manage Users</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 text-textMuted text-sm">
                                            <th className="pb-3 font-medium">ID</th>
                                            <th className="pb-3 font-medium">NAME</th>
                                            <th className="pb-3 font-medium">EMAIL</th>
                                            <th className="pb-3 font-medium">ROLE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {users.map(user => (
                                            <tr key={user._id} className="text-white">
                                                <td className="py-4 text-sm text-textMuted">{user._id.substring(0, 8)}...</td>
                                                <td className="py-4">{user.name}</td>
                                                <td className="py-4">{user.email}</td>
                                                <td className="py-4">
                                                    {user.role === 'admin' ? (
                                                        <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-bold">Admin</span>
                                                    ) : (
                                                        <span className="text-textMuted">User</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
