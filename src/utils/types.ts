import { Timestamp } from "firebase/firestore";

export type Post = {
    id: string;
    content: string;
    created_by: string;
    created_at: Timestamp;
    comments: Comment[];
}

export type Comment = {
    id: string | number;
    content: string;
    created_by: string;
    created_at: string;
}

export type User = {
    id: string;
    name: string;
    username: string;
    contact: Contact;
}

export type Contact = {
    email_address: string;
    phone_number: number
}