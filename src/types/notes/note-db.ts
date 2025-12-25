// Used by db, server 

import { Types } from "mongoose";

export interface NoteDocument {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  content: JSON;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
