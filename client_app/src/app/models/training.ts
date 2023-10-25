import { Profile } from "./profile";

export interface ITraining {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled?: boolean;
  isGoing?: boolean;
  isHost?: boolean;
  attendees: Profile[];
  host?: Profile;
}

export class Training implements ITraining {
  constructor(init: TrainingFormValues) {
    this.id = init.id!;
    this.title = init.title;
    this.date = init.date;
    this.description = init.description;
    this.category = init.category;
    this.city = init.city;
    this.venue = init.venue;
  }
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date | null;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled?: boolean;
  isGoing?: boolean;
  isHost?: boolean;
  attendees: Profile[] = [];
  host?: Profile;
}

export class TrainingFormValues {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date: Date | null = null;
  city: string = "";
  venue: string = "";

  constructor(Training?: TrainingFormValues) {
    if (Training) {
      this.id = Training.id;
      this.title = Training.title;
      this.description = Training.description;
      this.category = Training.category;
      this.date = Training.date;
      this.venue = Training.venue;
      this.city = Training.city;
    }
  }
}
