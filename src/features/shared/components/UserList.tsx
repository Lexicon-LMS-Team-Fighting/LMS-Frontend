import { IUser } from "../types";
import { UserInfo } from "./UserInfo";

interface IUserListProps {
  users: IUser[];
}

export const UserList: React.FC<IUserListProps> = ({ users }) => {
  if (!users || users.length === 0) {
    return <p>No users available</p>;
  }

  const fields = Object.keys(users[0]).filter((key) => key !== "userId");

  return (
    <section className="user-list-container">
      <ul className="user-list-group list-group">
        <li
          className="user-list-header desktop-view"
          style={{ ["--col-count" as any]: fields.length }}
        >
          {fields.map((head, i) => (
            <p className="item-heading" key={i}>
              {head}
            </p>
          ))}
        </li>

        {users.map((user) => {
          return <UserInfo key={user.userId} user={user} fields={fields} />;
        })}
      </ul>
    </section>
  );
};
