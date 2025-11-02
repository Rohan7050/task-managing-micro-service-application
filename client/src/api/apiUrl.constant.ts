export const AuthApiUrl = {
  register: {
    url: "/api/user/register",
    method: "POST",
  },
  login: {
    url: "/api/user/login",
    method: "POST",
  },
  logout: {
    url: "/api/user/logout",
    method: "POST",
  },
  currentuser: {
    url: "/api/user/currentuser",
    method: "GET",
  },
};

export const BoardApiUrl = {
  getAllBoards: {
    url: "/api/board",
    method: "GET"
  },
  createBoard: {
    url: "/api/board",
    method: "POST"
  }
}
