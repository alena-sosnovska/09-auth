import { api } from "../api/api"
import type { NewNote, Note } from "../../types/note";
import type { User } from "../../types/user";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
    email: string;  
    password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export const fetchNotes = async (searchText: string, page: number, perPage: number, tag: string) => {
    const response = await api.get<NoteResponse>("/notes", {
        params: {
          search: searchText,
          page: page,
          perPage: perPage,
          ...(tag !== "all" ? { tag } : {}),
          }
  });
  return response.data;
};

export const createNote = async(newNote: NewNote) => {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
}

export const deleteNote = async (noteId: string) => {
  const response = await api.delete<Note>(`/notes/${noteId}`);
  return response.data;
};

export const fetchNoteById = async (noteId: string) => {
  const response = await api.get<Note>(`/notes/${noteId}`);
  return response.data;
}

export const register = async (registerRequest: RegisterRequest) => {
  const response = await api.post<User>("/auth/register", registerRequest);
  return response.data;
}

export const login = async (loginRequest: LoginRequest) => {
  const response = await api.post<User>("/auth/login", loginRequest);
  return response.data;
}

export const logout = async(): Promise<void> => {
   await api.post("/auth/logout");
}

export const checkSession = async () => {
  const response = await api.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
}

export const getMe = async () => {
  const response = await api.get<User>("/users/me");
  return response.data;
} 

export const updateMe = async (updateRequest: { username: string }) => {
  const response = await api.patch<User>("/users/me", updateRequest);
  return response.data;
}




