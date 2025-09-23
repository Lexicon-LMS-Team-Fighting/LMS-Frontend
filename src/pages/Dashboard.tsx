import { ReactElement } from 'react';
import TeacherDashboard from '../features/shared/components/TeacherDashboard';
import "../features/shared/css/Dashboard.css"


export default function Dashboard(){
 


  return (
    <main className='main-container bg-gray-50'>
        <TeacherDashboard />
    </main>
  );
}
