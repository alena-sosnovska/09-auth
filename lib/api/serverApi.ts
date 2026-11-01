import { api } from "../api/api"
import type { User } from "../../types/user";
import { cookies } from "next/headers";
import { Note } from "@/types/note";
import {  NoteResponse } from "./clientApi";


export const checkSession = async () => {
    const cookieStore = await cookies();
    const response = await api.get("/auth/session", {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    return response;
};

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await api.get("/users/me", {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    return data;
};

export const fetchNotes = async (searchText: string, page: number, perPage: number, tag: string) => {
    const cookieStore = await cookies();
    const response = await api.get<NoteResponse>("/notes", {
        params: {
            search: searchText,
          page: page,
          perPage: perPage,
            ...(tag !== "all" ? { tag } : {}),
        },
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
    const cookieStore = await cookies();
    const response = await api.get<Note>(`/notes/${noteId}`, {
        headers: {
            Cookie: cookieStore.toString()
        }
    });
    return response.data;
};

