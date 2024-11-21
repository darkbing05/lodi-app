export interface CreateTrackDto {
  title: string;
  artist: string;
  genre: string;
  duration: number;
}

export interface UpdateTrackDto {
  id: string;
  title?: string;
  artist?: string;
  genre?: string;
  duration?: number;
}

export interface TrackData {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: number;
  file_url: string;
  preview_url: string;
  category: string;
  user_id: string;
  created_at: string;
}
