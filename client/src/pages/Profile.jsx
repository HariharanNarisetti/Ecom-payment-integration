import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Settings, Package, Heart, LogOut } from 'lucide-react';
import { useGetProfileQuery, useUpdateProfileMutation, useLogoutMutation } from '../features/api/usersApiSlice';
import { useGetMyOrdersQuery } from '../features/api/ordersApiSlice';
import { setCredentials, logout } from '../features/auth/authSlice';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
  confirmPassword: z.string().optional()
}).refine((data) => {
  if (data.password && data.password !== data.confirmPassword) return false;
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('profile');
    
    const { userInfo } = useSelector((state) => state.auth);
    const { data: profileData, isLoading: isProfileLoading, refetch } = useGetProfileQuery();
    const { data: ordersData, isLoading: isOrdersLoading } = useGetMyOrdersQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [logoutApi] = useLogoutMutation();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(profileSchema)
    });

    useEffect(() => {
        if (profileData?.data) {
            setValue('name', profileData.data.name);
            setValue('email', profileData.data.email);
        }
    }, [profileData, setValue]);

    const onUpdateProfile = async (data) => {
        try {
            const updateData = { name: data.name, email: data.email };
            if (data.password) updateData.password = data.password;
            
            const res = await updateProfile(updateData).unwrap();
            dispatch(setCredentials({ ...res.data }));
            toast.success('Profile updated successfully');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to update profile');
        }
    };

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
            window.location.href = '/login';
        } catch (err) {
            toast.error('Failed to logout');
        }
    };

    if (isProfileLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const orders = ordersData?.data || [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                        <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-white/10">
                            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold shadow-[0_0_15px_rgba(123,47,255,0.4)]">
                                {userInfo?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h3 className="text-white font-medium">{userInfo?.name}</h3>
                                <p className="text-textMuted text-xs">{userInfo?.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <button 
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-accent/20 text-white border border-accent/50' : 'text-textMuted hover:bg-white/5 hover:text-white border border-transparent'}`}
                            >
                                <Settings size={18} />
                                <span>Account Settings</span>
                            </button>
                            <button 
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-accent/20 text-white border border-accent/50' : 'text-textMuted hover:bg-white/5 hover:text-white border border-transparent'}`}
                            >
                                <Package size={18} />
                                <span>My Orders</span>
                            </button>
                            <Link 
                                to="/wishlist"
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-textMuted hover:bg-white/5 hover:text-white transition-all border border-transparent"
                            >
                                <Heart size={18} />
                                <span>My Wishlist</span>
                            </Link>
                            {userInfo?.role === 'admin' && (
                                <Link 
                                    to="/admin/dashboard"
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-highlight bg-highlight/10 border border-highlight/30 hover:bg-highlight/20 transition-all mt-4"
                                >
                                    <User size={18} />
                                    <span>Admin Dashboard</span>
                                </Link>
                            )}
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-all border border-transparent mt-4"
                            >
                                <LogOut size={18} />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Profile Settings Tab */}
                    {activeTab === 'profile' && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Account Settings</h2>
                            
                            <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6 max-w-2xl">
                                <div>
                                    <label className="block text-textMuted text-sm mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-textMuted" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register('name')}
                                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-accent outline-none"
                                        />
                                    </div>
                                    {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-textMuted text-sm mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-textMuted" />
                                        </div>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-accent outline-none"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
                                </div>

                                <div className="border-t border-white/10 pt-6 mt-6">
                                    <h3 className="text-white font-medium mb-4">Change Password</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-textMuted text-sm mb-2">New Password (leave blank to keep current)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-textMuted" />
                                                </div>
                                                <input
                                                    type="password"
                                                    {...register('password')}
                                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-accent outline-none"
                                                    placeholder="Enter new password"
                                                />
                                            </div>
                                            {errors.password && <p className="mt-1 text-sm text-error">{errors.password.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-textMuted text-sm mb-2">Confirm New Password</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-5 w-5 text-textMuted" />
                                                </div>
                                                <input
                                                    type="password"
                                                    {...register('confirmPassword')}
                                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-white/5 text-white focus:ring-2 focus:ring-accent outline-none"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                            {errors.confirmPassword && <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isUpdating}
                                        className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(123,47,255,0.4)] disabled:opacity-50"
                                    >
                                        {isUpdating ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Order History</h2>
                            
                            {isOrdersLoading ? (
                                <div className="flex justify-center py-12">
                                    <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package size={48} className="mx-auto text-textMuted mb-4" />
                                    <h3 className="text-xl text-white font-medium mb-2">No orders found</h3>
                                    <p className="text-textMuted mb-6">Looks like you haven't placed any orders yet.</p>
                                    <Link to="/products" className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full transition-colors">
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="py-4 text-white font-medium">Order ID</th>
                                                <th className="py-4 text-white font-medium">Date</th>
                                                <th className="py-4 text-white font-medium">Total</th>
                                                <th className="py-4 text-white font-medium">Payment</th>
                                                <th className="py-4 text-white font-medium">Status</th>
                                                <th className="py-4 text-right text-white font-medium">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-4 text-textMuted text-sm">{order.orderNumber}</td>
                                                    <td className="py-4 text-textMuted text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td className="py-4 text-white font-medium">₹{order.totalAmount.toFixed(2)}</td>
                                                    <td className="py-4">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${order.paymentStatus === 'paid' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                                                            {order.paymentStatus}
                                                        </span>
                                                    </td>
                                                    <td className="py-4">
                                                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                                                            order.status === 'delivered' ? 'bg-success/20 text-success' : 
                                                            order.status === 'shipped' ? 'bg-highlight/20 text-highlight' : 
                                                            order.status === 'processing' ? 'bg-accent/20 text-accent' : 
                                                            'bg-error/20 text-error'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <Link to={`/order/${order._id}`} className="text-accent hover:text-highlight transition-colors text-sm font-medium">
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
