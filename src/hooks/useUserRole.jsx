import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const DEFAULT_ROLE = 'donor';

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = DEFAULT_ROLE,
    isLoading: isRoleLoading,
    isError: isRoleError,
    refetch: refetchRole
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: typeof window !== 'undefined' && !!user?.email && !loading,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/role?email=${user.email}`);
        return res.data.role || DEFAULT_ROLE;
      } catch (error) {
        console.error("Error fetching user role:", error);
        return DEFAULT_ROLE;
      }
    },
    refetchOnMount: true, // ✅ ensures fresh data on each page mount
    staleTime: 0, // ✅ disables caching (or use 5000 for 5 sec cache)
  });

  return { role, isRoleLoading, isRoleError, refetchRole };
};

export default useUserRole;