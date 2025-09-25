import { ReactElement } from 'react';
import { useAuthContext } from '../../auth/hooks/useAuthContext';
import { useNavigate } from 'react-router';
import '../css/HeaderNav.css';
import { useIsTeacher } from '../hooks/useIsTeacher';


//TODO handle when auth is done
export function HeaderNav(): ReactElement {
  const isTeacher = useIsTeacher();
  const { isLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleOnLogout = () => {
    logout();
    console.log('clicked');
    navigate('/login');
  };

  return (
    <>
  {/* <!-- NAV --> */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button className="book-logo btn btn-link text-secondary me-3 p-0 d-flex justify-content-center align-items-center">
            {/* <!-- menu icon --> */}
            <span className="material-symbols-outlined">
              menu_book
            </span>
          </button>
          <h1 className="h5 fw-bold mb-0">Lexicon LMS</h1>
        </div>

        <div className="d-flex align-items-center justify-content-center gap-3">
          <button className="btn btn-link text-secondary p-0 d-flex">
            {/* <!-- bell icon --> */}
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          {/* <!-- User dropdown --> If it will be a dropdown*/}
          <div className="dropdown">
            <button className="btn d-flex align-items-center text-secondary" data-bs-toggle="dropdown">
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </div>
              <span className="ms-2 d-none d-md-inline">{isTeacher ? "Lärare" : "Elev"}</span>
            </button>
          </div>
          {/* Render logout if user is logged in */}
          {/* {isLoggedIn && ( */}
            <button onClick={handleOnLogout} className="btn d-flex align-items-center text-secondary">
              <span className="material-symbols-outlined">
                logout 
              </span>
              <span className="d-none d-md-inline">Logga ut</span>
            </button>
          {/* )} */}
        </div>
      </nav>
      </>
  );
}
