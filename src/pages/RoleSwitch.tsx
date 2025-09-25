import { ReactElement } from 'react';
import TeacherDashboard from '../features/shared/components/TeacherDashboard';
import StudentDashboard from '../features/shared/components/StudentDashboard';
import { useIsTeacher } from '../features/shared/hooks/useIsTeacher';


export default function RoleSwitch(): ReactElement {
  const isTeacher = useIsTeacher();

if (isTeacher) {
    return (
      <>
      {/* Other teacher components goes here*/ }
        <TeacherDashboard />
      </>
    );
  } else {
        return (
      <>
        {/* Other student components goes here*/ }
        <StudentDashboard />
      </>
    );
  } 
}
