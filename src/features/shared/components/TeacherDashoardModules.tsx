import { ReactElement, useState,useEffect } from "react";
import { Link } from "react-router";
import "../css/TeacherDashboardCourses.css";
import { Tab } from "./DashboardNavBar";
import Modal from './Modal';
import UpdateForm from './UpdateForm';
import { updateModule } from '../../auth/api/module';
import { CustomError } from '../../shared/classes';
import type { ModuleDraft } from './ModuleCreatePage';
import { IModule } from "../types/types";

type Draft = ModuleDraft
type Props = {
  modules: IModule[];
  onChange: (t: Tab) => void;
};
//TODO, receive course array as prop from parent instead


export default function TeacherDashboardModules({
  modules,
  onChange,
}: Props): ReactElement {
  const [moduleArr, setModuleArr] = useState<IModule[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState<IModule | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [modalMsg, setModalMsg] = useState<string | null>(null);


  function openEdit(module: IModule) {
    setEditing(module);
    setDraft({
      name: module.name,
      description: module.description ?? "",
      startDate: new Date(module.startDate),
      endDate: module.endDate ? new Date(module.endDate) : new Date(module.startDate),
    });
    setModalMsg(null);
  }

    const filteredArr = (moduleArr ?? []).filter((m) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      new Date(m.startDate).toISOString().toLowerCase().includes(q) ||
      new Date(m.endDate).toISOString().toLowerCase().includes(q)
    );
  });

     useEffect(() => {
    setModuleArr(modules)
  },[modules])

  function renderModule() {
    return (
      <tbody>
        {filteredArr?.map((module, i) => (
          <tr key={`${module.name}-${i}`} className="table-row-white">
            <td className="bold">{module.name}</td>
            <td className="text-gray">
              {module.startDate.toLocaleDateString()} - {" "}
              {module?.endDate?.toLocaleDateString()}
            </td>
            <td className="table-links">
              <Link to={`/teacher/module/${module.id}`}>Visa</Link>{" "}
              <button className="edit-course-button" onClick={() => openEdit(module)}>Redigera</button>
            </td>
          </tr>
        ))}
              
        {moduleArr?.length === 0 && (
          <tr>
            <td>Inga moduler ännu</td>
          </tr>
        )}
      </tbody>
    );
  }

const isValid =
    !!draft &&
    draft.name.trim().length > 0 &&
    !!draft.startDate && !!draft.endDate &&
    draft.startDate < draft.endDate;

  async function handleSubmit() {
      if (!editing || !draft) return;
      setSaving(true); setModalMsg(null);

      try {
        const updated: IModule = await updateModule(editing.id, draft); 
        setModuleArr(arr => arr?.map(c =>
          c.id === updated.id
            ? { ...c, ...updated, startDate: new Date(updated.startDate) , endDate: updated.endDate ? new Date(updated.endDate) : null }
            : c
        ) ?? arr);
        setEditing(null);
        setDraft(null);
        setModalMsg(`${updated.name} har uppdaterats`);
      } catch (e: unknown) {
      if (e instanceof CustomError) {
        const map: Record<number, string> = {
          400: "Kontrollera att fälten är korrekt ifyllda",
          401: "Du saknar behörighet att ändra moduler.",
          403: "Du saknar behörighet att ändra moduler.",
          404: "Modulen hittades inte.",
          500: "Ett serverfel inträffade.",
        };
        const fallback = e.message || "Ett fel inträffade.";
        setModalMsg(map[e.errorCode] ?? fallback);
      }
      } finally {
        setSaving(false);
      }
}

  return (
    <section className="dashboard-courses-container">
      <div className="card-border-radius-top">
        <h2 className="fs-5">Alla moduler</h2>
        <p className="p-gray">
          En översikt över alla moduler
        </p>
      </div>

      <div className="search-course">
        <input
          type="text"
          placeholder="Sök efter modul..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          className="create-course-button-small"
          onClick={() => onChange("new-module")}
        >
          <img src="plus-white.svg" id="plus-icon" />
          Ny modul
        </button>
      </div>

      <div className="courses-table-wrapper">
        <table className="courses-table">
          <thead>
            <tr className="table-header">
              <th>MODULNAMN</th>
              <th>PERIOD</th>
            </tr>
          </thead>
          {renderModule()}
        </table>
                 <Modal open={!!editing} onClose={() => { setEditing(null); setDraft(null); }}>
              {editing && draft && (
                <>
                  <UpdateForm
                    data={draft}
                    buttonText="Spara ändringar"
                    title={`Redigerar modul: ${editing.name}`}
                    onChange={setDraft}        
                    onSubmit={handleSubmit}        
                    disabled={!isValid || saving}
                  />
                  {modalMsg && (
                    <div className="alert alert-danger mt-2">{modalMsg}</div>
                  )}
                </>
              )}
            </Modal>
      </div>
    </section>
  );
}
