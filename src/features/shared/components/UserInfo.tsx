import { useState } from "react";
import { IUser } from "../types";
import { useMediaQuery } from "usehooks-ts";

interface IUserInfoProps {
  user: IUser;
  fields: string[];
}
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
    </>
  );
};
