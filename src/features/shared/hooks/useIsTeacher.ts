import { useLoaderData } from 'react-router';

type LoaderData = { roles: string[] };

export function useIsTeacher() {
  const { roles } = useLoaderData() as LoaderData;
  return roles.includes('Teacher');
 

}
