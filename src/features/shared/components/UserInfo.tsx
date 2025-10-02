import { useState } from "react";
import { IUser } from "../types";
import { useMediaQuery } from "usehooks-ts";

interface IUserInfoProps {
  user: IUser;
  fields: string[];
}
/**
 * This component renders user data, note that for mobile view, it omits the first header lable to match the labels in the dropdown. The first element index in the fields array is set as "Label" and shown in the mobile view list.
 * @param user IUser
 * @param fields string[] of fields derived from users field names
 * @returns The user with relevant data using IUser interface
 */
export const UserInfo: React.FC<IUserInfoProps> = ({ user, fields }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <li
        className={`list-group-item user-item ${isMobile ? "mobile-view" : ""}`}
        style={{ ["--col-count" as any]: fields.length }}
        onClick={isMobile ? () => setExpanded((prev) => !prev) : undefined}
      >
        {fields.map((field, index) => {
          const value = user[field as keyof IUser];
          const isMainField = index === 0;
          return (
            <p key={field} className={`user-data ${isMainField ? "user-main" : ""}`}>
              {field === "email" ? (
                <a href={`mailto:${value}`} title={`Click to send an email to ${user.namn}`}>
                  {value as string}
                </a>
              ) : (
                (value as string)
              )}

              {isMobile && isMainField && (
                <span className="material-symbols-outlined">
                  {expanded ? "keyboard_arrow_down" : "keyboard_arrow_right"}
                </span>
              )}
            </p>
          );
        })}
      </li>

      {/* Dropdown for mobile */}
      {isMobile && expanded && (
        <li className="user-dropdown">
          {fields.slice(1).map((field) => {
            const value = user[field as keyof IUser];
            if (!value) return null;
            const label: string = field;
            return (
              <p key={field} className="dropdown-data">
                <strong className="user-dropdown-label">{label}: </strong>
                {field === "email" ? (
                  <a href={`mailto:${value}`}>{value as string}</a>
                ) : (
                  (value as string)
                )}
              </p>
            );
          })}
        </li>
      )}
    </>
  );
};
