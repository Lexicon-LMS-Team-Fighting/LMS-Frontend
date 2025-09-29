/* import { ReactElement } from "react";

interface IRoleSelectorProps {
  role: string;
  onRoleChange: (value: string) => void;
}

export function RoleSelector({ role, onRoleChange }: IRoleSelectorProps): ReactElement {
  return (
    <div className="role-container">
      <label className="role-label">Välj roll</label>
      <div className="role-input-container">
        <label className="student-role-label">
          <input
            className="role-input"
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={() => onRoleChange("student")}
          />
          <span>Elev</span>
        </label>
        <label className="teacher-role-label">
          <input
            className="role-input"
            type="radio"
            name="role"
            value="teacher"
            checked={role === "teacher"}
            onChange={() => onRoleChange("teacher")}
          />
          <span>Lärare</span>
        </label>
      </div>
    </div>
  );
}
 */