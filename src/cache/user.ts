import { MongooseFilterQuery, MongooseUpdateQuery } from "mongoose";
import UserModel from "../database/models/user/user.model";
import User from "../database/models/user/user.type";

export class UserCache {
    private _raw = new Map<string, User>();

    constructor() {
        this._setCache();
    }

    private async _setCache(): Promise<void> {
        const users = await UserModel.find()
        for (const u of users)
            this._raw.set(u.uId, u);
    }

    /**
     * Gets a user from the cache.
     */
    public get(uId: string): User {
        return this._raw.get(uId);
    }

    /**
     * Get all users from the cache.
     */
    public getAll(): User[] {
        const arr: User[] = [];
        this._raw.forEach(u => arr.push(u));
        return arr;
    }

    /**
     * Creates a user in the cache and db.
     * @param data - The data used to create the user. Type of param in UserModel.create(data) method.
     */
    public async create(data: UserCreateQuery): Promise<User> {
        const u = await UserModel.create(data);
        this._raw.set(u.uId, u);
        return u;
    }

    /**
     * Updates a user in the cache and db.
     */
    public async update(user: User, updateQuery?: UserUpdateQuery): Promise<User> {
        await user.updateOne(updateQuery || user);
        this._raw.set(user.uId, user);
        return user;
    }


    /**
     * Deletes a user from the cache and the db.
     */
    public async delete(identifier: string | User): Promise<User> {
        if (typeof identifier === 'string') {
            const u = this._raw.get(identifier);
            u.deleteOne();
            this._raw.delete(identifier);
            return u;
        }
        else {
            this._raw.delete(identifier.uId);
            return await identifier.deleteOne();
        }
    }
}


export type UserCreateQuery = Pick<{
    _id: any;
    uId: string;
    prestige?: string | number;
    balance?: string | number;
    stores?: any[];
} & {
    _id: any;
}, "uId" | "prestige" | "balance" | "stores"> & {
    _id?: any;
}

export type UserUpdateQuery = MongooseUpdateQuery<Pick<User, "_id" | "uId" | "prestige" | "balance" | "stores">>
export type UserGetQuery = MongooseFilterQuery<Pick<User, "_id" | "uId" | "prestige" | "balance" | "stores">>