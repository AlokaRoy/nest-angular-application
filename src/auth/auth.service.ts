import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './auth.entity';

@Injectable()
export class AuthService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {}

  async signUp(username: string, password: string) {
    const user = { username, password };
    this.users.push(user);
    return user;
  }

  async login(username: string, password: string) {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { token };
    } else {
      return { error: 'Invalid username or password' };
    }
  }

  async checkIfSignedUp() {
    return this.users.length > 0;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (!user) {
      return null;
    }
    return user;
  }
}


