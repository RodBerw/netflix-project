export interface movieDTO {
  id?: number;
  userId: number;
  title: string;
  description: string;
  director: string;
  genre: string;
  releaseDate: Date;
  imageUrl: string;
}
