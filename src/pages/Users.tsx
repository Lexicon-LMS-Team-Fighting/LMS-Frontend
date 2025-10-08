import { ReactElement, useState, useEffect } from "react";
import "../features/shared/css/Users.css";
import { Link, useLoaderData, Await, } from "react-router";
import type { IUserDeferredLoader } from "../features/auth/loaders/UsersLoader";
import Modal from "../features/shared/components/Modal";
import UpdateUsersForm from "../features/shared/components/UpdateUsersForm";
import {  Suspense } from "react";
import { IUser } from "../features/shared/types";
import { updateUser, createUser } from "../features/auth/api/users";
import { CustomError } from "../features/shared/classes";

type Role = "Student" | "Teacher";
type Draft = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password?: string;
  role: Role;
};

const EMPTY_DRAFT: Draft = {
  id: "",       
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  role: "Student",
};

export default function Users(): ReactElement {
  const { users } = useLoaderData<IUserDeferredLoader>();
  const [usersArr, setUsersArr] = useState<Draft[] | null>(null)
  const [editingUser, setEditingUser] = useState<Draft | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalMsg, setModalMsg] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);

    useEffect(() => {
    let alive = true;
    users.then(list => {
      if (!alive) return;
      const toDraft = (u: IUser): Draft => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        userName: u.userName,
        email: u.email,
        role: (u.role as Role) ?? "Student",
      });
      setUsersArr(list.map(toDraft));
    }).catch(() => setUsersArr([]));
    return () => { alive = false; };
  }, [users]);

  function openEdit(user: Draft) {
    setEditingUser(user);
    setDraft(user);
    setModalMsg(null);
  }

      function openCreate() {
        setCreatingUser(true);
        setEditingUser(null);
        setDraft(EMPTY_DRAFT);
        setModalMsg(null);
      }
  
  function formatRole(role: Role) {
    return role === "Teacher" ? "Lärare" : "Elev"
  }


  async function handleUpdate() {
        if (!editingUser || !draft) return;
        setSaving(true); setModalMsg(null);
  
        try {
          const updated: Draft = await updateUser(editingUser.id, draft); 
          setUsersArr(arr => arr?.map(u =>
            u.id === updated.id
              ? { ...u, ...updated }
              : u
          ) ?? arr);
          setEditingUser(null);
          setDraft(null);
          setModalMsg(`${updated.firstName} ${updated.lastName} har uppdaterats`);
        } catch (e: unknown) {
        if (e instanceof CustomError) {
          const map: Record<number, string> = {
            400: "Kontrollera att fälten är korrekt ifyllda",
            401: "Du saknar behörighet att ändra användare.",
            403: "Du saknar behörighet att ändra användare.",
            404: "Användaren hittades inte.",
            500: "Ett serverfel inträffade.",
          };
          const fallback = e.message || "Ett fel inträffade.";
          setModalMsg(map[e.errorCode] ?? fallback);
        }
        } finally {
          setSaving(false);
        }
  }
  
  async function handleSubmit(){
    if (!draft) return;
        setSaving(true); setModalMsg(null);
        try {
          const created: Draft = await createUser(draft);

          const createdDraft: Draft = {
            id: created.id,
            firstName: created.firstName,
            lastName: created.lastName,
            userName: created.userName,
            email: created.email,
            role: created.role as Role,
          };

          setUsersArr(prev => prev ? [createdDraft, ...prev] : [createdDraft]);
          setCreatingUser(false);
          setDraft(null);
          setModalMsg(`${createdDraft.firstName} ${createdDraft.lastName} skapades`);
        } catch (e) {
          if (e instanceof CustomError) {
            const map: Record<number, string> = {
              400: "Kontrollera att fälten är korrekt ifyllda",
              401: "Du saknar behörighet att skapa användare.",
              403: "Du saknar behörighet att skapa användare.",
              500: "Ett serverfel inträffade.",
            };
            setModalMsg(map[e.errorCode] ?? (e.message || "Ett fel inträffade."));
          } else {
            setModalMsg("Ett fel inträffade.");
          }
        } finally {
          setSaving(false);
        }
  }

  return (
    <main className="main-wrapper">
      <h1 className="fs-3 mb-4">Användare</h1>

      <section className="quick-option">
        <h2 className="fs-5 mb-3">Snabbåtgärder</h2>
        <button className="quick-option-button shadow-sm font-weight-bold" onClick={() => openCreate()}>
          <div className="plus-icon-container">
            <img src="plus.svg" className="asd" />
          </div>
          Lägg till användare
        </button>
      </section>

      <section className="users-section">
        <table className="courses-table">
          <thead>
            <tr className="table-header">
              <th>NAMN</th>
              <th>EMAIL</th>
              <th>ANV. NAMN</th>
              <th>ROLL</th>
              <th></th>
            </tr>
          </thead>

    <Suspense>
        <Await resolve={usersArr} errorElement={null}>
          {(userArr) => (
            <tbody className="table-body">
              {userArr?.map((user) => (
                <tr key={user.id} className="table-row-white">
                  <td className="bold">{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>{formatRole(user.role)}</td>
                             <td className="table-links">
              <button className="edit-course-button" onClick={() => openEdit(user)}>Redigera</button>
            </td>
                </tr>
              ))}
            </tbody>
          )}
        </Await>
      </Suspense>
        </table>

        {/*Edit modal*/}
        <Modal open={!!editingUser} onClose={() => { setEditingUser(null); setDraft(null); }}>
                      {editingUser && draft && (
                        <>
                          <UpdateUsersForm
                            data={draft}
                            buttonText="Spara ändringar"
                            title={`Redigerar användare: ${editingUser.firstName} ${editingUser.lastName}`}
                            onChange={setDraft}        
                            onSubmit={handleUpdate}        
                            disabled={saving}
                          />
                          {modalMsg && (
                            <div className="alert alert-danger mt-2">{modalMsg}</div>
                          )}
                        </>
                      )}
                    </Modal>

                {/*Create modal*/}

                     <Modal open={creatingUser} onClose={() => { setCreatingUser(false); setDraft(null); }}>
                      {creatingUser && draft && (
                        <>
                          <UpdateUsersForm
                            data={draft}
                            buttonText="Skapa användare"
                            title={"Skapa användare"}
                            onChange={setDraft}        
                            onSubmit={handleSubmit}        
                            disabled={saving}
                          />
                          {modalMsg && (
                            <div className="alert alert-danger mt-2">{modalMsg}</div>
                          )}
                        </>
                      )}
                    </Modal>
      </section>
    </main>
  );
}
