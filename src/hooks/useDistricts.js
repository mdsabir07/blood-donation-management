import { useQuery } from '@tanstack/react-query';

const useDistricts = () => {
  return useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const res = await fetch('/bangladesh_districts.json');
      if (!res.ok) throw new Error('Failed to fetch districts');
      return res.json();
    }
  });
};

export default useDistricts;