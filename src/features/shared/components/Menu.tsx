import { ReactElement } from 'react';
import "../css/Menu.css"
import { useLocation, Link } from 'react-router';
import { useIsTeacher } from '../hooks/useIsTeacher';



export default function Menu(): ReactElement{
    const {pathname} = useLocation();
    const isTeacher = useIsTeacher();


  const isTabActive = (path: string, exact = false) =>
    exact ? pathname === path : pathname === path || pathname.startsWith(path + "/");

  return (
    <menu className='menu-container'>

            <Link to="/" className={`menu-item ${isTabActive("/", true) ? "active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="menu-icon" aria-hidden="true" data-id="element-32"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                </path></svg>
            Dashboard</Link>



             <Link to="/courses" className={`menu-item ${isTabActive("/courses", true) ? "active" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="menu-icon" aria-hidden="true" data-id="element-248"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z">
                </path></svg>
               {isTeacher ? "Kurser" : "Min kurs"} </Link>


             <Link to="/assignments" className={`menu-item ${isTabActive("/assignments", true) ? "active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="menu-icon" aria-hidden="true" data-id="element-34"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8">
                </path><path d="M16 17H8">
                </path></svg>
                Inlämningar</Link>

            {isTeacher && 
             <Link to="/users" className={`menu-item ${isTabActive("/users", true) ? "active" : ""}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="menu-icon" aria-hidden="true" data-id="element-35"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
                Användare</Link>
            }

            {!isTeacher && 
             <Link to="/participants" className={`menu-item ${isTabActive("/participants", true) ? "active" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="menu-icon" aria-hidden="true" data-id="element-35"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
            Kursdeltagare</Link>
            }
      </menu>
  );
}
