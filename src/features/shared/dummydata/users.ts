import { IUser } from "../types";

// TODO: Remove temporary dummy data when backend is connected and implemented
export const users: IUser[] = [
  {
    userId: "1",
    namn: "Anna Andersson",
    användarnamn: "anna01",
    email: "anna.andersson@example.com",
    test: "test",
  },
  { userId: "2", namn: "Erik Eriksson", användarnamn: "erikE", email: "erik.eriksson@example.com" },
  {
    userId: "3",
    namn: "Maria Svensson",
    användarnamn: "mariaS",
    email: "maria.svensson@example.com",
  },
  {
    userId: "4",
    namn: "Johan Nilsson",
    användarnamn: "johanN",
    email: "johan.nilsson@example.com",
  },
  { userId: "5", namn: "Sara Lindberg", användarnamn: "saraL", email: "sara.lindberg@example.com" },
];
