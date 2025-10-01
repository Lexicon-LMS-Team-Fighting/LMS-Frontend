import { IUser } from "../types";

// TODO: Remove temporary dummy data
export const users = [
  { userId: "1", userName: "anna01", name: "Anna Andersson", email: "anna.andersson@example.com" },
  { userId: "2", userName: "erikE", name: "Erik Eriksson", email: "erik.eriksson@example.com" },
  { userId: "3", userName: "mariaS", name: "Maria Svensson", email: "maria.svensson@example.com" },
  { userId: "4", userName: "johanN", name: "Johan Nilsson", email: "johan.nilsson@example.com" },
  { userId: "5", userName: "saraL", name: "Sara Lindberg", email: "sara.lindberg@example.com" },
];

interface IUserListProps {
  users: IUser[];
}

export const UserList: React.FC<IUserListProps> = ({ users }) => {
  return (
    <section className="user-list-container">
    </section>
  );
};
