// useUserRole.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const DEFAULT_ROLE = 'donor';

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const isReady = !!user?.email && !loading;

  const {
    data: role = DEFAULT_ROLE,
    isLoading: isRoleLoading,
    isError: isRoleError,
    refetch: refetchRole
  } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: isReady,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/role?email=${user.email}`);
        return res.data.role || DEFAULT_ROLE;
      } catch (error) {
        console.error("🔴 Error fetching user role:", error);
        return DEFAULT_ROLE;
      }
    },
    refetchOnMount: true,
    staleTime: 0
  });

  return { role, isRoleLoading, isRoleError, refetchRole };
};

export default useUserRole;