import { User } from "../Models/user.model.js";
import { BaseRepository } from "./base.repository.js";

class UserRepository extends BaseRepository {  
  constructor() {
    console.log("User =", User);
    
    super(User);
  }
}

export default new UserRepository();
