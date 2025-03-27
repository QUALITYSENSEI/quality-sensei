import { 
  users, type User, type InsertUser
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

/**
 * This is a simple in-memory storage implementation.
 * It should ONLY be used for development and testing.
 * 
 * NOTE: This class is no longer used as the application is fully static.
 * It remains here for reference and potential future use.
 */
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  userCurrentId: number;

  constructor() {
    this.users = new Map();
    this.userCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
