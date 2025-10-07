import { useState } from 'react';
import AddNewModule from './AddNewModuleForm';
import { IModule } from '../types';
import { createModule } from '../../auth/api/module';
import { CustomError } from '../../shared/classes';

export type ModuleDraft = {
  courseId?: string;
  name: string;
  startDate: Date; 
  endDate: Date; 
  description?: string;
};
type CourseSummary = { id: string; name: string };

type Props = {
  courses: CourseSummary[];
};

export default function ModuleCreatePage({ courses = [] }: Props) {
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string|null>(null);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);



  async function submitModule(draft: ModuleDraft) {
    setMsg(null);
    setErrorMsg(null);


    if (!draft.courseId || !draft.name.trim() || !draft.startDate || !draft.endDate || draft.startDate > draft.endDate) {
      setErrorMsg("Se till att alla fält är korrekt ifyllda");
      return;
    }

    try {
      setSaving(true);
      const created: IModule = await createModule(draft); 
      setMsg(`Modul skapad: ${created.name}`);
    } catch (e: unknown) {
      if (e instanceof CustomError) {
        const map: Record<number, string> = {
          400: "En modul med det namnet finns redan",
          401: "Du saknar behörighet att skapa moduler.",
          403: "Du saknar behörighet att skapa moduler.",
          404: "Modulen hittades inte.",
          500: "Ett serverfel inträffade.",
        };
        setErrorMsg(map[e.errorCode] ?? (e.message || "Ett fel inträffade."));
      } else {
        setErrorMsg("Ett oväntat fel inträffade.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AddNewModule
        courses={courses}
        onSubmit={submitModule}
        disabled={saving}
      />
      {msg && <div className="alert alert-success mt-3">{msg}</div>}
      {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
    </div>
  );
}
